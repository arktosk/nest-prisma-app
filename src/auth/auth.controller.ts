import {
  Controller,
  NotImplementedException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as Req } from 'express';
import { User } from '.prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Req<Record<'user', User>>) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register() {
    throw new NotImplementedException();
  }

  @Post('reset-password')
  async resetPassword() {
    throw new NotImplementedException();
  }
}
