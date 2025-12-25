/*
  Warnings:

  - You are about to drop the column `bank` on the `immo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "immo" DROP COLUMN "bank",
ADD COLUMN     "banque" TEXT;
