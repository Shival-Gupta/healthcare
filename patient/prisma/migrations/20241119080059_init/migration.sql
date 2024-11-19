/*
  Warnings:

  - You are about to drop the column `fullName` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `fullName`,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `provider` DROP COLUMN `fullName`,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL;
