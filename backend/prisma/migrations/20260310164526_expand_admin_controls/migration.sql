-- AlterTable
ALTER TABLE "routes" ADD COLUMN     "departureTimes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "departureTime" DROP NOT NULL,
ALTER COLUMN "arrivalTime" DROP NOT NULL;

-- CreateTable
CREATE TABLE "global_settings" (
    "id" TEXT NOT NULL DEFAULT 'global_config',
    "siteName" TEXT NOT NULL DEFAULT 'Onukpa Express Ride',
    "contactEmail" TEXT NOT NULL DEFAULT 'support@onukpaexpress.com',
    "contactPhone" TEXT DEFAULT '+233XXXXXXXXX',
    "whatsappNumber" TEXT DEFAULT '+233XXXXXXXXX',
    "facebookUrl" TEXT DEFAULT 'https://facebook.com',
    "twitterUrl" TEXT DEFAULT 'https://twitter.com',
    "instagramUrl" TEXT DEFAULT 'https://instagram.com',
    "defaultCurrency" TEXT NOT NULL DEFAULT 'GHS',
    "paymentProvider" TEXT NOT NULL DEFAULT 'paystack',
    "maxSeatsPerBooking" INTEGER NOT NULL DEFAULT 10,
    "enableEmailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "global_settings_pkey" PRIMARY KEY ("id")
);
