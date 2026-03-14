
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function test() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to database');
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}
test();
