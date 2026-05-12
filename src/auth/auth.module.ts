import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, ApiKeyGuard],
  controllers: [AuthController],
  exports: [AuthService, ApiKeyGuard],
})
export class AuthModule {}
