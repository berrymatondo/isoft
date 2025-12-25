/*
  Warnings:

  - You are about to drop the column `createAt` on the `assurance` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `assurance` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `rgpd` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `rgpd` table. All the data in the column will be lost.
  - You are about to drop the column `assuId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `immoId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.
  - Added the required column `updatedat` to the `assurance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `rgpd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personid` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_assuId_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_immoId_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_personId_fkey";

-- AlterTable
ALTER TABLE "assurance" DROP COLUMN "createAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "immo" DROP COLUMN "createAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "rgpd" DROP COLUMN "createAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "assuId",
DROP COLUMN "createAt",
DROP COLUMN "immoId",
DROP COLUMN "personId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "assuid" INTEGER,
ADD COLUMN     "createat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "immoid" INTEGER,
ADD COLUMN     "personid" INTEGER NOT NULL,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userid" INTEGER;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_personid_fkey" FOREIGN KEY ("personid") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assuid_fkey" FOREIGN KEY ("assuid") REFERENCES "assurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_immoid_fkey" FOREIGN KEY ("immoid") REFERENCES "immo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
