/*
  Warnings:

  - The primary key for the `refreshtokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tokenId` on the `refreshtokens` table. All the data in the column will be lost.
  - The required column `rTokenId` was added to the `RefreshTokens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `course` MODIFY `duration` TIME NOT NULL;

-- AlterTable
ALTER TABLE `refreshtokens` DROP PRIMARY KEY,
    DROP COLUMN `tokenId`,
    ADD COLUMN `rTokenId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`rTokenId`);

-- CreateTable
CREATE TABLE `OtpToken` (
    `oTokenId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `expiredAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `OtpToken_userId_key`(`userId`),
    PRIMARY KEY (`oTokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailToken` (
    `eTokenId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `expiredAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EmailToken_userId_key`(`userId`),
    PRIMARY KEY (`eTokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OtpToken` ADD CONSTRAINT `OtpToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailToken` ADD CONSTRAINT `EmailToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
