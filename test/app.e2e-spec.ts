import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { ApiKeyGuard } from './../src/auth/api-key.guard';
import { AuthController } from './../src/auth/auth.controller';
import { MetricsController } from './../src/metrics/metrics.controller';
import { PostsController } from './../src/posts/posts.controller';
import { UsersController } from './../src/users/users.controller';

describe('Instagram API integration', () => {
  let moduleFixture: TestingModule;
  let authController: AuthController;
  let metricsController: MetricsController;
  let usersController: UsersController;
  let postsController: PostsController;
  let apiKeyGuard: ApiKeyGuard;
  let apiKey: string;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authController = moduleFixture.get(AuthController);
    metricsController = moduleFixture.get(MetricsController);
    usersController = moduleFixture.get(UsersController);
    postsController = moduleFixture.get(PostsController);
    apiKeyGuard = moduleFixture.get(ApiKeyGuard);

    const registerResponse = authController.register({
      name: 'Ana Lopez',
      email: `ana-${Date.now()}@instagram.test`,
    });
    apiKey = registerResponse.apiKey;
  });

  afterEach(async () => {
    await moduleFixture.close();
  });

  it('calcula engagement', () => {
    expect(
      metricsController.getEngagement({
        likes: 80,
        comments: 20,
        followers: 500,
      }),
    ).toEqual({ rate: 20 });
  });

  it('rechaza acceso sin api key', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as ExecutionContext;

    expect(() => apiKeyGuard.canActivate(context)).toThrow('API Key requerida');
  });

  it('crea usuario, post y comentario, y los lista con relaciones', async () => {
    const user = await usersController.create({
      username: 'ana_gram',
      bio: 'Fotografa',
      followers: 1200,
    });

    const post = await usersController.createPost(user.id, {
      caption: 'Atardecer en la montana',
      likes: 340,
    });

    const comment = await postsController.createComment(post.id, {
      content: 'Que foto tan hermosa!',
      author: 'carlos_dev',
    });

    expect(comment).toMatchObject({
      content: 'Que foto tan hermosa!',
      author: 'carlos_dev',
    });

    const users = await usersController.findAll();
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject({
      id: user.id,
      username: 'ana_gram',
      followers: 1200,
    });
    expect(users[0].posts).toHaveLength(1);
    expect(users[0].posts[0]).toMatchObject({
      id: post.id,
      caption: 'Atardecer en la montana',
      likes: 340,
    });

    const posts = await usersController.findPostsByUser(user.id);
    expect(posts).toHaveLength(1);
    expect(posts[0].comments).toHaveLength(1);
    expect(posts[0].comments[0]).toMatchObject({
      content: 'Que foto tan hermosa!',
      author: 'carlos_dev',
    });
  });

  it('calcula cpm', () => {
    expect(
      metricsController.getCpm({
        cost: 50,
        impressions: 10000,
      }),
    ).toEqual({ cpm: 5 });
  });

  it('acepta api key valida', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { 'x-api-key': apiKey } }),
      }),
    } as ExecutionContext;

    expect(apiKeyGuard.canActivate(context)).toBe(true);
  });
});
