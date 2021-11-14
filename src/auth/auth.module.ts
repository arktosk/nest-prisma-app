import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CryptoModule } from '../services/crypto/crypto.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({}), CryptoModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
