/*
  Warnings:

  - You are about to drop the column `adressPet` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `addressPet` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_adressPet_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "adressPet",
ADD COLUMN     "addressPet" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_addressPet_fkey" FOREIGN KEY ("addressPet") REFERENCES "Organization"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
