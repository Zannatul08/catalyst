/*
  Warnings:

  - You are about to drop the column `careatedAt` on the `Assessment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "careatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
