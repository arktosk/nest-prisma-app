import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { CryptoService } from '../services/crypto/crypto.service';
import { PrismaClientService } from '../services/prisma/prisma-client.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaClientService,
    private cryptoService: CryptoService,
  ) {}

  async findUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await this.cryptoService.hash(data.password),
      },
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
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
