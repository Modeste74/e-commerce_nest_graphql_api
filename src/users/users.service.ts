import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user = this.userRepository.create({
      email,
      password
    });

    return this.userRepository.save(user);
  }

  async findByEmail(email: string) : Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateEmail(email: string, newEmail: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    user.email = newEmail;
    return this.userRepository.save(user);
  }

  // async updatePass(email: string, newPassword: string)

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
