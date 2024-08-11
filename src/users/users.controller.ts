import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserZodValidationPipe } from 'src/pipes/user/user-pipes';
import { createUserDto, createUserSchema } from 'src/pipes/user/user-type';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
export class UsersController {
  //   @Get()
  //   finaAll() {
  //     return 'This route return all users';
  //   }

  @Get()
  findOne(@Query() query: { id: string; name: string }) {
    return `This is the requested user id:${query.id} and name is ${query.name}`;
  }

  @Get('/get-one-user/:id')
  findOneByEmail(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return id;
  }

  // @Post()
  // @UsePipes(new UserZodValidationPipe(createUserSchema))
  // create(@Body() user: createUserDto) {
  //   return JSON.stringify(user);
  // }

  @Post()
  create(@Body(new ValidationPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})) user: CreateUserDto) {
    return JSON.stringify(user);
  }
}
