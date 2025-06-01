/*
  Warnings:

  - The required column `id` was added to the `Organization` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");
