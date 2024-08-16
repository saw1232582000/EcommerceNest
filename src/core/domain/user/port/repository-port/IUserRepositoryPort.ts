import { IBaseRepository } from 'src/core/common/base-repository/port';
import { UserEntity } from '../../entity/user';
import { Injectable } from '@nestjs/common';



@Injectable()
export abstract class IUserRepository implements IBaseRepository<UserEntity,{id?:string,email?:string,name?:string}> {
    create: (entity: UserEntity) => Promise<UserEntity>;
    delete: (id: string) => Promise<boolean>;
    find: (by: {id?:string,email?:string,name?:string}) => Promise<UserEntity | null>;
    findAll: () => Promise<UserEntity[]>;
    update: (entity: UserEntity) => Promise<UserEntity>;
}
