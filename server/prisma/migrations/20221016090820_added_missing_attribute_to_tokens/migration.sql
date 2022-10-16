/*
  Warnings:

  - Added the required column `token` to the `EmailToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `OtpToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` MODIFY `duration` TIME NOT NULL;

-- AlterTable
ALTER TABLE `emailtoken` ADD COLUMN `token` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `otptoken` ADD COLUMN `token` VARCHAR(6) NOT NULL;

-- AlterTable
ALTER TABLE `refreshtokens` ADD COLUMN `token` VARCHAR(255) NOT NULL;
