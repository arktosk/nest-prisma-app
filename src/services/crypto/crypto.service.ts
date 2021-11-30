import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './crypto.config';

@Injectable()
export class CryptoService {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, SALT_ROUNDS);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
