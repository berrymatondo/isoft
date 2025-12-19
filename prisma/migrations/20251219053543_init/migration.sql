/*
  Warnings:

  - You are about to drop the `persons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "persons";

-- CreateTable
CREATE TABLE "person" (
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
    "userid" INTEGER,
    "username" TEXT,
    "origin" TEXT,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "person_email_key" ON "person"("email");
