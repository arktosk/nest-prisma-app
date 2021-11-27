import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { CryptoService } from '../services/crypto/crypto.service';
import { PrismaClientService } from '../services/prisma/prisma-client.service';

const selectPublicFields = {
  id: true,
  email: true,
  name: true,
  password: false,
  createdAt: false,
  updatedAt: false,
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaClientService,
    private cryptoService: CryptoService,
  ) {}

  async findAuthInfo(
    userWhereUniqueInput: Pick<Prisma.UserWhereUniqueInput, 'email'>,
  ): Promise<Pick<User, 'id' | 'email' | 'password'> | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  async findUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: selectPublicFields,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Omit<User, 'password'>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: selectPublicFields,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await this.cryptoService.hash(data.password),
      },
      select: selectPublicFields,
    });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      data: {
        ...data,
        password: data.password
          ? await this.cryptoService.hash(data.password as string)
          : undefined,
      },
      where,
      select: selectPublicFields,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
      select: selectPublicFields,
    });
  }
}
