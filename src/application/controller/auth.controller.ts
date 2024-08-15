import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { SinginUserDto } from 'src/core/domain/auth/dto/SigninUserDto';
import { AuthService } from 'src/core/domain/auth/service/Authservice';

import { LocalGuard } from '../auth/guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  async SignIn(@Body() credential: SinginUserDto): Promise<any> {
    const result = await this.authService.validateUser(credential);
    return result;
    // if (result) return result;
    // else throw new UnauthorizedException();
  }
}
