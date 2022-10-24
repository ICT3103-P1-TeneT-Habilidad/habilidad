/*
  Warnings:

  - You are about to drop the column `email` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `topics` table. All the data in the column will be lost.
  - The values [Administrators] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `administrators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `passwordhistories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchasedcourse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountPaid` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `administrators` DROP FOREIGN KEY `Administrators_userId_fkey`;

-- DropForeignKey
ALTER TABLE `passwordhistories` DROP FOREIGN KEY `PasswordHistories_accountsId_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedcourse` DROP FOREIGN KEY `PurchasedCourse_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedcourse` DROP FOREIGN KEY `PurchasedCourse_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedcourse` DROP FOREIGN KEY `PurchasedCourse_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `topics` DROP FOREIGN KEY `Topics_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_accountId_email_phoneNumber_fkey`;

-- DropIndex
DROP INDEX `Account_accountId_email_phoneNumber_key` ON `account`;

-- DropIndex
DROP INDEX `Account_email_key` ON `account`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `email`,
    DROP COLUMN `phoneNumber`;

-- AlterTable
ALTER TABLE `course` ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `topics` DROP COLUMN `courseId`;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `amountPaid` DOUBLE NOT NULL,
    ADD COLUMN `courseId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('User', 'Student', 'Instructor', 'Moderator', 'Employees') NOT NULL;

-- DropTable
DROP TABLE `administrators`;

-- DropTable
DROP TABLE `passwordhistories`;

-- DropTable
DROP TABLE `purchasedcourse`;

-- CreateTable
CREATE TABLE `TopicCourse` (
    `topicCourseId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `topicId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TopicCourse_courseId_topicId_key`(`courseId`, `topicId`),
    PRIMARY KEY (`topicCourseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Account_accountId_key` ON `Account`(`accountId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_accountId_key` ON `User`(`accountId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopicCourse` ADD CONSTRAINT `TopicCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopicCourse` ADD CONSTRAINT `TopicCourse_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topics`(`topicId`) ON DELETE RESTRICT ON UPDATE CASCADE;
