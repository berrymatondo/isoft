/*
  Warnings:

  - You are about to drop the column `userId` on the `persons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "persons" DROP COLUMN "userId",
ADD COLUMN     "userid" INTEGER;
