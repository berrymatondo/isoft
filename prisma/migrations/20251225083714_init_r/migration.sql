/*
  Warnings:

  - You are about to drop the column `userid` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "person" DROP COLUMN "userid",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "userid",
ADD COLUMN     "userId" INTEGER;
