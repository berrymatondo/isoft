/*
  Warnings:

  - You are about to drop the column `userId` on the `assurance` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assurance" DROP COLUMN "userId",
ADD COLUMN     "userid" INTEGER;

-- AlterTable
ALTER TABLE "immo" DROP COLUMN "userId",
ADD COLUMN     "userid" INTEGER;

-- AlterTable
ALTER TABLE "person" DROP COLUMN "userId",
ADD COLUMN     "userid" INTEGER;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "userId",
ADD COLUMN     "userid" INTEGER;
