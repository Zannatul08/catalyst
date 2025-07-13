/*
  Warnings:

  - You are about to drop the column `recommendedSKills` on the `IndustryInsight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "recommendedSKills",
ADD COLUMN     "recommendedSkills" TEXT[];
