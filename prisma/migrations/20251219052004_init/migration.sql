/*
  Warnings:

  - You are about to drop the `person` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "person";

-- CreateTable
CREATE TABLE "persons" (
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
    "userId" INTEGER,
    "username" TEXT,
    "origin" TEXT,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");
