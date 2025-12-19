-- CreateTable
CREATE TABLE "rgpd" (
    "id" SERIAL NOT NULL,
    "createat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "personid" INTEGER NOT NULL,
    "signed" BOOLEAN NOT NULL DEFAULT false,
    "checksum" INTEGER NOT NULL,

    CONSTRAINT "rgpd_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rgpd_personid_key" ON "rgpd"("personid");

-- AddForeignKey
ALTER TABLE "rgpd" ADD CONSTRAINT "rgpd_personid_fkey" FOREIGN KEY ("personid") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
