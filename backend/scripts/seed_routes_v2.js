const db = require('../config/database');
require('dotenv').config();

async function seed() {
  try {
    console.log('Clearing existing routes...');
    await db.execute('DELETE FROM routes');

    const routes = [
      ['Accra', 'Kumasi', 150, '06:00', 45, 'ACTIVE'],
      ['Kumasi', 'Accra', 150, '08:00', 45, 'ACTIVE'],
      ['Accra', 'Hohoe', 120, '07:00', 45, 'ACTIVE'],
      ['Hohoe', 'Accra', 120, '13:00', 45, 'ACTIVE'],
      ['Accra', 'Cape Coast', 100, '07:30', 45, 'ACTIVE'],
      ['Cape Coast', 'Accra', 100, '14:00', 45, 'ACTIVE'],
      ['Accra', 'Ho', 80, '09:00', 45, 'ACTIVE'],
      ['Ho', 'Accra', 80, '15:00', 45, 'ACTIVE']
    ];

    for (const r of routes) {
      const deptTimes = JSON.stringify([r[3]]);
      await db.execute(
        'INSERT INTO routes (origin, destination, base_price, departure_time, total_seats, available_seats, status, departure_times) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [r[0], r[1], r[2], r[3], r[4], r[4], r[5], deptTimes]
      );
    }
    console.log('Seeded successfully with ' + routes.length + ' routes');
  } catch (e) {
    console.error('Seeding failed:', e);
  } finally {
    process.exit(0);
  }
}

seed();
