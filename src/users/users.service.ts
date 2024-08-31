
import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    console.log('Searching for username:', username);
    return this.users.find(user => user.username === username);
  }
}
