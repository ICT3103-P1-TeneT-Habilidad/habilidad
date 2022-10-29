/*
  Warnings:

  - You are about to drop the column `accountId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `deActivatedOn` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_accountId_fkey`;

-- DropIndex
DROP INDEX `User_accountId_email_phoneNumber_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `accountId`,
    DROP COLUMN `deActivatedOn`,
    ADD COLUMN `deactivationDate` DATETIME(3) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `account`;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_phoneNumber_key` ON `User`(`email`, `phoneNumber`);
