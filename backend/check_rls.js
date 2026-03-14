const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRls() {
  try {
    const res = await prisma.$queryRaw`
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public' AND tablename = 'routes';
    `;
    console.log('RLS Status:', JSON.stringify(res, null, 2));

    const policies = await prisma.$queryRaw`
      SELECT * FROM pg_policies WHERE tablename = 'routes';
    `;
    console.log('Policies:', JSON.stringify(policies, null, 2));

    const count = await prisma.route.count();
    console.log('Route count (via Prisma):', count);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

checkRls();
