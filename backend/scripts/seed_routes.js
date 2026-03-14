const mysql = require('mysql2/promise');
require('dotenv').config();

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'wkm_transport'
  });

  try {
    console.log('Clearing existing routes...');
    await connection.execute('DELETE FROM routes');

    const routes = [
      ['Accra', 'Kumasi', 150, '06:00', 45, 'ACTIVE'],
      ['Kumasi', 'Accra', 150, '08:00', 45, 'ACTIVE'],
      ['Accra', 'Cape Coast', 100, '07:30', 45, 'ACTIVE'],
      ['Cape Coast', 'Accra', 100, '14:00', 45, 'ACTIVE'],
      ['Accra', 'Ho', 80, '09:00', 45, 'ACTIVE'],
      ['Ho', 'Accra', 80, '15:00', 45, 'ACTIVE']
    ];

    for (const r of routes) {
      const deptTimes = JSON.stringify([r[3]]);
      await connection.execute(
        'INSERT INTO routes (origin, destination, base_price, departure_time, total_seats, available_seats, status, departure_times) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [r[0], r[1], r[2], r[3], r[4], r[4], r[5], deptTimes]
      );
    }
    console.log('Seeded successfully');
  } catch (e) {
    console.error('Seeding failed:', e);
  } finally {
    await connection.end();
  }
}

seed();
