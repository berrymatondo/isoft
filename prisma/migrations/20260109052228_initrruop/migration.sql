/*
  Warnings:

  - A unique constraint covering the columns `[origin]` on the table `parameter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "parameter_origin_key" ON "parameter"("origin");
