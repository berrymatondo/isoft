/*
  Warnings:

  - You are about to drop the column `demaccepted` on the `immo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "immo" DROP COLUMN "demaccepted",
ADD COLUMN     "demaccepetd" BOOLEAN NOT NULL DEFAULT false;
