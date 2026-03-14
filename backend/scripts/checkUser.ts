import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function checkAdminUser() {
  const email = 'admin@onukpaexpress.com';
  const passwordToCheck = 'Admin@2024';

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    console.log(`User not found with email: ${email}`);
    return;
  }

  console.log('User found:', {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName
  });

  const isMatch = await bcrypt.compare(passwordToCheck, user.password);
  console.log(`Password match with "${passwordToCheck}":`, isMatch);
}

checkAdminUser()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
