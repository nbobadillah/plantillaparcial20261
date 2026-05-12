import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Ya existe un usuario registrado con ese email.',
      );
    }

    const user = this.usersRepository.create({
      name: dto.name.trim(),
      email,
      apiKey: uuidv4(),
    });

    const savedUser = await this.usersRepository.save(user);

    return {
      apiKey: savedUser.apiKey,
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async isValidKey(apiKey: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { apiKey: apiKey.trim() },
      select: ['id'],
    });

    return Boolean(user);
  }
}
