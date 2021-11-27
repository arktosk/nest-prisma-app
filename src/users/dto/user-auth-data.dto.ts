import { User } from '@prisma/client';

export type UserAuthDataDto = Pick<User, 'id' | 'email' | 'password'>;
