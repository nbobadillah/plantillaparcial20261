import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();
    const rawKey = request.headers['x-api-key'];
    const apiKey = Array.isArray(rawKey) ? rawKey[0] : rawKey;

    if (!apiKey || !this.authService.isValidKey(apiKey)) {
      throw new UnauthorizedException('API Key requerida');
    }

    return true;
  }
}
