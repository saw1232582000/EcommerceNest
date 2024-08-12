export interface IBaseRepository<T>{
    create:(entity:T)=>Promise<boolean>;
    update:(entity:T)=>Promise<boolean>;
    delete:(id:string)=>Promise<boolean>;
    find:(id:string)=>Promise<T>;
    findAll:()=>Promise<T[]>;
}