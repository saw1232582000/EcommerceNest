import { UserRole } from "src/core/common/type/UserEnum";

export class UserEntity {
  id: string;

  name: string;

  email: string;

  role: UserRole;

  password: string;

  createdDate: Date;

  updatedDate: Date;

  constructor(
    id: string = "",
    name: string,
    email: string,
    role: UserRole,
    password: string,
    createdDate?: Date,
    updatedDate?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }

  public static toEntity(user: any): UserEntity {
    return new UserEntity(
      user?.id,
      user?.name,
      user?.email,
      user?.role,
      user?.password,
      user?.createdDate,
      user?.updatedDate,
    );
  }
}
