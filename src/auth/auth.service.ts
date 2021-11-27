import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../services/crypto/crypto.service';
import { UsersService } from '../users/users.service';
import { JwtTokenPayload } from './jwt-token-payload';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    this.logger.debug(`User "${email}" requests authorization`);

    const userAuthInfo = await this.usersService.findAuthInfo({ email });

    if (userAuthInfo == null) {
      this.logger.debug(`User "${email}" does not exists in system`);
      return null;
    }

    if (!(await this.cryptoService.compare(password, userAuthInfo.password))) {
      this.logger.debug(`User "${email}" cannot be authorized`);
      return null;
    }

    this.logger.debug(`User "${email}" is authorized`);
    const user = await this.usersService.findUnique({ email });
    return user;
  }

  async login(user: any) {
    const payload: JwtTokenPayload = {
      email: user.email,
      id: user.id,
    };
    this.logger.debug(`Signing JWT for "${user.email}"`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
