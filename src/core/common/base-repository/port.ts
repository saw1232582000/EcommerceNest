import { Optional } from "../type/CommonTypes";

export interface IBaseRepository<T,TFindByType>{
    create:(entity:T)=>Promise<boolean>;
    update:(entity:T)=>Promise<boolean>;
    delete:(id:string)=>Promise<boolean>;
    find:(by:TFindByType)=>Promise<Optional<T>>;
    findAll:()=>Promise<T[]>;
}