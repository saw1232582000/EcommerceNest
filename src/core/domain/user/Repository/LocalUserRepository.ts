import { UserEntity } from '../entity/User';
import { IUserRepository } from '../port/repository-port/IUserRepositoryPort';

const LocalUsers: UserEntity[] = [
  {
    id: '1',
    name: 'user1',
    email: 'user1@gmail.com',
    role: 'SELLER',
    password: 'user123456',
    createDate: new Date(),
    updatedDate: new Date(),
  },
  {
    id: '2',
    name: 'user2',
    email: 'user2@gmail.com',
    role: 'SELLER',
    password: 'user123456',
    createDate: new Date(),
    updatedDate: new Date(),
  },
  {
    id: '3',
    name: 'user3',
    email: 'user3@gmail.com',
    role: 'SELLER',
    password: 'user123456',
    createDate: new Date(),
    updatedDate: new Date(),
  },
];

export class LocalUserRepository implements IUserRepository {
  async create(user: UserEntity): Promise<boolean> {
    return true;
  }
  async update(user: UserEntity): Promise<boolean> {
    return true;
  }
  async delete(id: string): Promise<boolean> {
    return true;
  }
  async find(id: string): Promise<UserEntity | null> {
    return LocalUsers.filter((user) => user.id === id)[0];
  }
  async findAll(): Promise<UserEntity[]> {
    return LocalUsers;
  }
}
