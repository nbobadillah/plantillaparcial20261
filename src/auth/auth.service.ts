import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RegisterDto } from './dto/register.dto';

type RegisteredAuthUser = {
  apiKey: string;
  email: string;
  name: string;
};

@Injectable()
export class AuthService {
  private readonly registeredUsers = new Map<string, RegisteredAuthUser>();
  private readonly apiKeys = new Set<string>();

  register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();

    if (this.registeredUsers.has(email)) {
      throw new BadRequestException(
        'Ya existe un usuario registrado con ese email.',
      );
    }

    const authUser = {
      apiKey: randomUUID(),
      email,
      name: dto.name.trim(),
    };
    this.registeredUsers.set(email, authUser);
    this.apiKeys.add(authUser.apiKey);

    return {
      apiKey: authUser.apiKey,
      name: authUser.name,
      email: authUser.email,
    };
  }

  isValidKey(apiKey: string): boolean {
    return this.apiKeys.has(apiKey.trim());
  }
}
