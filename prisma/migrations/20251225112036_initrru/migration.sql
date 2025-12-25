/*
  Warnings:

  - Added the required column `demamount` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taux` to the `immo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "immo" ADD COLUMN     "bank" TEXT,
ADD COLUMN     "bankname" TEXT,
ADD COLUMN     "demaccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "demamount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "duree" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mensualite" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "taux" DECIMAL(10,2) NOT NULL;
