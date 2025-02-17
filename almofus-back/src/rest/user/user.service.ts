import { Injectable } from '@nestjs/common';
import { User } from 'src/db/model/user.entity';
import { UserRepository } from 'src/db/repositories/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  createUser(name: string, email: string): Promise<User> {
    const newUser = new User(name, email);
    return this.userRepository.save(newUser);
  }
}
