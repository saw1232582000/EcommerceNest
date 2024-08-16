import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/core/common/type/UserEnum';
import { BaseResponseSchema } from '../../common/BaseResponseSchema';

class CreateUserResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(UserRole, { message: 'Valid Role is required' })
  role: UserRole;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateUserResonseSchema extends BaseResponseSchema {
  @ApiProperty({ type: CreateUserResponse })
  public data: CreateUserResponse;
}
