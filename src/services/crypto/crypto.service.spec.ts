import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash passed string data', async () => {
    const data = 'sone_string_that_should_be_secret';
    const hash = await service.hash(data);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(data);
  });
});
