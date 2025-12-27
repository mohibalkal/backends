import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/client';

let prismaInstance: PrismaClient;

const getPrisma = () => {
  if (!prismaInstance) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    prismaInstance = new PrismaClient({ adapter });
  }
  return prismaInstance;
};

export const prisma = new Proxy({} as PrismaClient, {
  get: (_target, prop) => {
    return getPrisma()[prop as keyof PrismaClient];
  },
});

