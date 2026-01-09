/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `parameter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "parameter_origin_key";

-- CreateIndex
CREATE UNIQUE INDEX "parameter_name_key" ON "parameter"("name");
