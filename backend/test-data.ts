
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function test() {
  try {
    await prisma.$connect();
    const routeCount = await prisma.route.count();
    console.log('Route count:', routeCount);
    const users = await prisma.user.findMany({ select: { email: true, role: true } });
    console.log('Users:', users);
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}
test();
