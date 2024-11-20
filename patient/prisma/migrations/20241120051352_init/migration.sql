-- CreateTable
CREATE TABLE `Admin` (
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `username` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dob` DATETIME(3) NULL,

    UNIQUE INDEX `Patient_email_key`(`email`),
    UNIQUE INDEX `Patient_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provider` (
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `category` ENUM('DOCTOR', 'OPERATOR') NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,
    `licenseNumber` VARCHAR(191) NULL,
    `verificationStatus` ENUM('PENDING', 'APPROVED', 'DENIED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Provider_email_key`(`email`),
    UNIQUE INDEX `Provider_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `Provider_licenseNumber_key`(`licenseNumber`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` VARCHAR(191) NOT NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `remarks` VARCHAR(191) NULL,
    `prescription` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'SCHEDULED', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Appointment_patientId_idx`(`patientId`),
    INDEX `Appointment_providerId_idx`(`providerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmergencyContact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,

    INDEX `EmergencyContact_patientId_idx`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Provider`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmergencyContact` ADD CONSTRAINT `EmergencyContact_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
