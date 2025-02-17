import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/db/model/user.entity';
import { UserRepository } from 'src/db/repositories/user/user.repository';
import { PasswordService } from '../utils/auth/password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async getUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await this.passwordService.verifyPassword(password, user.password))) {
      throw new ForbiddenException('Wrong credentials');
    }
    return user;
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(password);
    const newUser = new User(name, email, hashedPassword);
    return this.userRepository.save(newUser);
  }
}
