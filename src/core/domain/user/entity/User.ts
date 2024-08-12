export class UserEntity {
  id: string;

  name: string;

  email: string;

  role: 'SELLER' | 'BUYER' | 'ADMIN';

  password: string;

  createDate: Date;

  updatedDate: Date;

  constructor(id:string,name:string,email:string,role:'SELLER' | 'BUYER' | 'ADMIN',password:string){
    this.id=id;
    this.name=name;
    this.email=email;
    this.role=role;
    this.password=password;
    this.createDate=new Date()
    this.updatedDate=new Date()
  }
}
