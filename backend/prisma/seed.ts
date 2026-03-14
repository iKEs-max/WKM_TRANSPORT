/**
 * Run with:
 *   npx ts-node prisma/seed.ts
 * from the /backend directory.
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ── Admin account ──
  const password = await bcrypt.hash('Admin@2024', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@onukpaexpress.com' },
    update: {},
    create: {
      email:     'admin@onukpaexpress.com',
      password,
      firstName: 'Onukpa',
      lastName:  'Admin',
      role:      'ADMIN',
    },
  });

  console.log(`✅ Admin created: ${admin.email}`);

  // ── Global Settings ──
  const settings = await prisma.globalSetting.upsert({
    where: { id: 'global_config' },
    update: {
      siteName: 'Onukpa Express Ride',
      contactEmail: 'IKEATDEHP@GMAIL.COM',
      contactPhone: '0553576777',
      whatsappNumber: '0553576777',
      maxSeatsPerBooking: 15,
    },
    create: {
      id: 'global_config',
      siteName: 'Onukpa Express Ride',
      contactEmail: 'IKEATDEHP@GMAIL.COM',
      contactPhone: '0553576777',
      whatsappNumber: '0553576777',
    },
  });
  console.log(`✅ Global settings initialized`);

  // ── Production-Ready Routes ──
  const routesData = [
    { 
      departure: 'Accra (Circle)', 
      destination: 'Kumasi (Kejetia)', 
      departureTimes: ['06:00', '08:00', '10:00', '14:00'],
      estimatedDuration: '4h 30min',
      operatingDays: 'Daily',
      price: 120, 
      totalSeats: 45,
      availableSeats: 45, 
      isPopular: true,
      status: 'ACTIVE' as const 
    },
    { 
      departure: 'Kumasi (Kejetia)', 
      destination: 'Accra (Circle)', 
      departureTimes: ['06:00', '08:00', '10:00', '14:00'],
      estimatedDuration: '4h 30min',
      operatingDays: 'Daily',
      price: 120, 
      totalSeats: 45,
      availableSeats: 45, 
      isPopular: true,
      status: 'ACTIVE' as const 
    },
    { 
      departure: 'Legon (UG Gate)', 
      destination: 'KNUST (Ayigya)',      
      departureTimes: ['07:30', '14:30'],
      estimatedDuration: '4h 45min',
      operatingDays: 'Fri, Sun',
      price: 100, 
      totalSeats: 30,
      availableSeats: 30, 
      isPopular: true,
      status: 'ACTIVE' as const 
    },
    { 
      departure: 'KNUST (Ayigya)',      
      destination: 'Legon (UG Gate)', 
      departureTimes: ['07:30', '14:30'],
      estimatedDuration: '4h 45min',
      operatingDays: 'Fri, Sun',
      price: 100, 
      totalSeats: 30,
      availableSeats: 30, 
      isPopular: true,
      status: 'ACTIVE' as const 
    },
    { 
      departure: 'Accra (Circle)',      
      destination: 'Cape Coast (UCC)',     
      departureTimes: ['06:30', '09:00', '13:00'],
      estimatedDuration: '2h 30min',
      operatingDays: 'Daily',
      price: 80, 
      totalSeats: 40,
      availableSeats: 40, 
      isPopular: false,
      status: 'ACTIVE' as const 
    },
    { 
      departure: 'Cape Coast (UCC)',    
      destination: 'Accra (Circle)',       
      departureTimes: ['06:30', '09:00', '13:00'],
      estimatedDuration: '2h 30min',
      operatingDays: 'Daily',
      price: 80, 
      totalSeats: 40,
      availableSeats: 40, 
      isPopular: false,
      status: 'ACTIVE' as const 
    },
    { 
      departure: 'Accra (Circle)',              
      destination: 'Takoradi',              
      departureTimes: ['07:00', '11:00', '15:00'],
      estimatedDuration: '3h 30min',
      operatingDays: 'Daily',
      price: 90, 
      totalSeats: 45,
      availableSeats: 45, 
      isPopular: true,
      status: 'ACTIVE' as const 
    },
    { 
      departure: 'Kumasi',             
      destination: 'Tamale',                
      departureTimes: ['05:00', '10:00'],
      estimatedDuration: '7h 00min',
      operatingDays: 'Daily',
      price: 180,
      totalSeats: 45,
      availableSeats: 45, 
      isPopular: false,
      status: 'ACTIVE' as const 
    },
  ];

  // Clear existing routes for a clean "realist" start
  await prisma.route.deleteMany({});
  
  for (const r of routesData) {
    await prisma.route.create({ data: r });
  }

  console.log(`✅ ${routesData.length} production-ready routes created`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
