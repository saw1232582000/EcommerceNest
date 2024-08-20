import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { SinginUserDto } from 'src/core/domain/auth/dto/SigninUserDto';
import { AuthService } from 'src/core/domain/auth/service/Authservice';

import { LocalGuard } from '../auth/guard/local.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequestSchema } from './documentation/auth/RequestSchema/AuthRequestSchema';
import { AuthResponseSchema } from './documentation/auth/ResponseSchema/AuthResponseSchema';
import { CoreApiResonseSchema } from 'src/core/common/schema/ApiResponseSchema';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiBody({ type: AuthRequestSchema })
  @ApiResponse({ type: AuthResponseSchema })
  @HttpCode(HttpStatus.OK)
  async SignIn(
    @Body(
      new ValidationPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    credential: AuthRequestSchema,
  ): Promise<CoreApiResonseSchema<any>> {
    const result = await this.authService.validateUser(credential);
    return CoreApiResonseSchema.success({ token: result });
  }
}
