import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CryptoService } from '../services/crypto/crypto.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUnique({ email });

    if (user && (await this.cryptoService.compare(password, user.password))) {
      return { ...user, password: undefined };
    }
    return null;
  }
}
