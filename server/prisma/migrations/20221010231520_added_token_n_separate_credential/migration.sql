/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId,email,phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_phoneNumber_key` ON `user`;

-- AlterTable
ALTER TABLE `course` MODIFY `duration` TIME NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `accountId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Account` (
    `accountId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` INTEGER NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_accountId_email_phoneNumber_key`(`accountId`, `email`, `phoneNumber`),
    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordHistories` (
    `id` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `accountsId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PasswordHistories_accountsId_passwordHash_key`(`accountsId`, `passwordHash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshTokens` (
    `tokenId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `expiredAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RefreshTokens_userId_key`(`userId`),
    PRIMARY KEY (`tokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_accountId_email_phoneNumber_key` ON `User`(`accountId`, `email`, `phoneNumber`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_accountId_email_phoneNumber_fkey` FOREIGN KEY (`accountId`, `email`, `phoneNumber`) REFERENCES `Account`(`accountId`, `email`, `phoneNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordHistories` ADD CONSTRAINT `PasswordHistories_accountsId_fkey` FOREIGN KEY (`accountsId`) REFERENCES `Account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefreshTokens` ADD CONSTRAINT `RefreshTokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
