const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixRls() {
  try {
    console.log('Disabling RLS on routes table...');
    await prisma.$executeRawUnsafe('ALTER TABLE routes DISABLE ROW LEVEL SECURITY;');
    
    // Also add a policy just in case they re-enable it
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'routes' AND policyname = 'Allow public select'
        ) THEN
          ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
          CREATE POLICY "Allow public select" ON routes FOR SELECT USING (true);
        END IF;
      END
      $$;
    `);
    
    console.log('RLS fix applied successfully.');
  } catch (err) {
    console.error('Error applying RLS fix:', err);
  } finally {
    await prisma.$disconnect();
  }
}

fixRls();
