import { Prisma } from '@prisma/client';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  email?: string;
  name?: string | null;
  password?: string;
}
