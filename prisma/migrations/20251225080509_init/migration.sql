/*
  Warnings:

  - You are about to drop the `Assurance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Immo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rgpd` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Solde` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assurance" DROP CONSTRAINT "Assurance_personId_fkey";

-- DropForeignKey
ALTER TABLE "Immo" DROP CONSTRAINT "Immo_personId_fkey";

-- DropForeignKey
ALTER TABLE "Rgpd" DROP CONSTRAINT "Rgpd_personId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assuId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_immoId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_personId_fkey";

-- DropTable
DROP TABLE "Assurance";

-- DropTable
DROP TABLE "Immo";

-- DropTable
DROP TABLE "Parameter";

-- DropTable
DROP TABLE "Rgpd";

-- DropTable
DROP TABLE "Solde";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "assurance" (
    "id" SERIAL NOT NULL,
    "comments" TEXT,
    "status" "AssuStatus" NOT NULL,
    "type" "AssuType" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "username" TEXT,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "assurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "type" "ProductType" NOT NULL,
    "personId" INTEGER NOT NULL,
    "assuId" INTEGER,
    "immoId" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "username" TEXT,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rgpd" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personId" INTEGER NOT NULL,
    "signed" BOOLEAN NOT NULL DEFAULT false,
    "checksum" INTEGER NOT NULL,

    CONSTRAINT "rgpd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solde" (
    "id" SERIAL NOT NULL,
    "denom" TEXT NOT NULL,
    "category" "catagoryTyp" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "conjoint" BOOLEAN NOT NULL DEFAULT false,
    "immoId" INTEGER NOT NULL,

    CONSTRAINT "solde_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parameter" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "visible" BOOLEAN DEFAULT false,
    "origin" TEXT,

    CONSTRAINT "parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "immo" (
    "id" SERIAL NOT NULL,
    "anaDone" BOOLEAN NOT NULL DEFAULT false,
    "cachierCharge" TEXT,
    "debutClause" TIMESTAMP(3),
    "demandeCours" TEXT,
    "endDate" TIMESTAMP(3),
    "fileClosed" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "offerAccepted" BOOLEAN NOT NULL DEFAULT false,
    "offerDone" BOOLEAN NOT NULL DEFAULT false,
    "rechercheBien" TEXT,
    "startDate" TIMESTAMP(3),
    "immoStatus" "ImmoStatus" NOT NULL DEFAULT 'NEW',
    "maritalStatus" "MaritalStatus" NOT NULL,
    "salNet" DECIMAL(10,2) NOT NULL,
    "salNetCo" DECIMAL(10,2) NOT NULL,
    "chqRep" DECIMAL(10,2) NOT NULL,
    "chqRepCo" DECIMAL(10,2) NOT NULL,
    "autRev" DECIMAL(10,2) NOT NULL,
    "autRevCo" DECIMAL(10,2) NOT NULL,
    "prtTmp" DECIMAL(10,2) NOT NULL,
    "prtTmpCo" DECIMAL(10,2) NOT NULL,
    "autPrt" DECIMAL(10,2) NOT NULL,
    "autPrtCo" DECIMAL(10,2) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "username" TEXT,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "immo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rgpd_personId_key" ON "rgpd"("personId");

-- AddForeignKey
ALTER TABLE "assurance" ADD CONSTRAINT "assurance_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assuId_fkey" FOREIGN KEY ("assuId") REFERENCES "assurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_immoId_fkey" FOREIGN KEY ("immoId") REFERENCES "immo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rgpd" ADD CONSTRAINT "rgpd_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "immo" ADD CONSTRAINT "immo_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
