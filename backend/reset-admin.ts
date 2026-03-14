
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function resetAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    const user = await prisma.user.upsert({
      where: { email: 'admin@onukpaexpress.com' },
      update: { password: hashedPassword, role: 'ADMIN' },
      create: {
        email: 'admin@onukpaexpress.com',
        password: hashedPassword,
        firstName: 'Onukpa',
        lastName: 'Admin',
        role: 'ADMIN'
      }
    });
    console.log('✅ Admin password reset to: Admin@123');
    console.log('User role:', user.role);

    const routes = await prisma.route.findMany();
    console.log('Current Routes in DB:', routes.length);
    if (routes.length > 0) {
      console.log('First Route:', JSON.stringify(routes[0], null, 2));
    }
  } catch (err) {
    console.error('❌ Error resetting admin:', err);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdmin();
