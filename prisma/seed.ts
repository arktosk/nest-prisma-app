import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$connect();

  await Promise.all(
    ['John', 'Lisa', 'Bob'].map((name) =>
      bcrypt.hash('secret', 10).then((hashedPassword) =>
        prisma.user.create({
          data: {
            name: name,
            email: `${name.toLowerCase()}@example.com`,
            password: hashedPassword,
          },
        }),
      ),
    ),
  );
};

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
});
