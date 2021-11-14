import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../services/prisma';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CryptoModule } from '../services/crypto/crypto.module';

@Module({
  imports: [PrismaClientModule, CryptoModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
