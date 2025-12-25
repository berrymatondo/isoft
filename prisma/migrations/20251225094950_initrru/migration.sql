/*
  Warnings:

  - You are about to drop the column `anaDone` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `autPrt` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `autPrtCo` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `autRev` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `autRevCo` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `cachierCharge` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `chqRep` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `chqRepCo` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `debutClause` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `demandeCours` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `fileClosed` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `immoStatus` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `maritalStatus` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `offerAccepted` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `offerDone` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `prtTmp` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `prtTmpCo` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `rechercheBien` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `salNet` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `salNetCo` on the `immo` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `immo` table. All the data in the column will be lost.
  - Added the required column `autprt` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autprtco` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autrev` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autrevco` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chqrep` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chqrepco` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalstatus` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prttmp` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prttmpco` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salnet` to the `immo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salnetco` to the `immo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "immo" DROP COLUMN "anaDone",
DROP COLUMN "autPrt",
DROP COLUMN "autPrtCo",
DROP COLUMN "autRev",
DROP COLUMN "autRevCo",
DROP COLUMN "cachierCharge",
DROP COLUMN "chqRep",
DROP COLUMN "chqRepCo",
DROP COLUMN "debutClause",
DROP COLUMN "demandeCours",
DROP COLUMN "endDate",
DROP COLUMN "fileClosed",
DROP COLUMN "immoStatus",
DROP COLUMN "maritalStatus",
DROP COLUMN "offerAccepted",
DROP COLUMN "offerDone",
DROP COLUMN "prtTmp",
DROP COLUMN "prtTmpCo",
DROP COLUMN "rechercheBien",
DROP COLUMN "salNet",
DROP COLUMN "salNetCo",
DROP COLUMN "startDate",
ADD COLUMN     "anadone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "autprt" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "autprtco" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "autrev" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "autrevco" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "cachiercharge" TEXT,
ADD COLUMN     "chqrep" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "chqrepco" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "debutclause" TIMESTAMP(3),
ADD COLUMN     "demandecours" TEXT,
ADD COLUMN     "enddate" TIMESTAMP(3),
ADD COLUMN     "fileclosed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "immostatus" "ImmoStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "maritalstatus" "MaritalStatus" NOT NULL,
ADD COLUMN     "offeraccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "offerdone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prttmp" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "prttmpco" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "recherchebien" TEXT,
ADD COLUMN     "salnet" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "salnetco" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "startdate" TIMESTAMP(3);
