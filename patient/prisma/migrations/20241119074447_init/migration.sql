/*
  Warnings:

  - Made the column `phoneNumber` on table `patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `patient` MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phoneNumber` VARCHAR(191) NOT NULL,
    MODIFY `dob` DATETIME(3) NULL;
