-- AlterTable
ALTER TABLE "routes" ADD COLUMN     "estimatedDuration" TEXT DEFAULT '4h 00min',
ADD COLUMN     "operatingDays" TEXT DEFAULT 'Daily';
