/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adressPet` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "adressPet" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_address_key" ON "Organization"("address");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_adressPet_fkey" FOREIGN KEY ("adressPet") REFERENCES "Organization"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
