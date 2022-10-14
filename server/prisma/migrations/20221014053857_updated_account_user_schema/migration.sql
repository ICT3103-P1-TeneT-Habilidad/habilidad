/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `course` MODIFY `duration` TIME NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `deActivatedOn` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Account_email_key` ON `Account`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Account_username_key` ON `Account`(`username`);
