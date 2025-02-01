import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user/user.repository';
import { User } from 'src/db/model/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  createUser(name: string): Promise<User> {
    const newUser = new User(name, `${name}@gmail.com`);
    return this.userRepository.create(newUser);
  }
}
