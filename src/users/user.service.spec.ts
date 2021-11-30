import { Test, TestingModule } from '@nestjs/testing';
import { CryptoModule } from '../services/crypto/crypto.module';
import { PrismaClientModule } from '../services/prisma';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UserService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaClientModule, CryptoModule],
      controllers: [UsersController],
      providers: [UsersService],
      exports: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
