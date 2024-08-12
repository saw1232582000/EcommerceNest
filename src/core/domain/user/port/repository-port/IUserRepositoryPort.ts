import { IBaseRepository } from 'src/core/common/base-repository/port';
import { UserEntity } from '../../entity/user';
import { Injectable } from '@nestjs/common';


@Injectable()
export abstract class IUserRepository implements IBaseRepository<UserEntity> {
    create: (entity: UserEntity) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
    find: (id: string) => Promise<UserEntity>;
    findAll: () => Promise<UserEntity[]>;
    update: (entity: UserEntity) => Promise<boolean>;
}
