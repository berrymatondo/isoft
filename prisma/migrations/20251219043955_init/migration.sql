-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Homme', 'Femme');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('M', 'C');

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "maritalstatus" "MaritalStatus" NOT NULL,
    "birthday" TIMESTAMP(3),
    "mobile" TEXT,
    "email" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "origin" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
