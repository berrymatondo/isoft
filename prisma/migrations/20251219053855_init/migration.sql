/*
  Warnings:

  - You are about to drop the column `createAt` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `person` table. All the data in the column will be lost.
  - Added the required column `updatedat` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "person" DROP COLUMN "createAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;
