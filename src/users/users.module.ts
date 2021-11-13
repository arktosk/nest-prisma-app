import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../services/prisma';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
