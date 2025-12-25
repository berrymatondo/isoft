/*
  Warnings:

  - You are about to drop the column `personId` on the `assurance` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `rgpd` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personid]` on the table `rgpd` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personid` to the `assurance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personid` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personid` to the `rgpd` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assurance" DROP CONSTRAINT "assurance_personId_fkey";

-- DropForeignKey
ALTER TABLE "immo" DROP CONSTRAINT "immo_personId_fkey";

-- DropForeignKey
ALTER TABLE "rgpd" DROP CONSTRAINT "rgpd_personId_fkey";

-- DropIndex
DROP INDEX "rgpd_personId_key";

-- AlterTable
ALTER TABLE "assurance" DROP COLUMN "personId",
ADD COLUMN     "personid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "immo" DROP COLUMN "personId",
ADD COLUMN     "personid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rgpd" DROP COLUMN "personId",
ADD COLUMN     "personid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rgpd_personid_key" ON "rgpd"("personid");

-- AddForeignKey
ALTER TABLE "assurance" ADD CONSTRAINT "assurance_personid_fkey" FOREIGN KEY ("personid") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rgpd" ADD CONSTRAINT "rgpd_personid_fkey" FOREIGN KEY ("personid") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "immo" ADD CONSTRAINT "immo_personid_fkey" FOREIGN KEY ("personid") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
