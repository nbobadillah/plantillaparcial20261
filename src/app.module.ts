import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MetricsModule } from './metrics/metrics.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import process from 'process';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.NODE_ENV === 'test' ? ':memory:' : 'instagram.db',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: process.env.NODE_ENV === 'test',
    }),
    AuthModule,
    MetricsModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
