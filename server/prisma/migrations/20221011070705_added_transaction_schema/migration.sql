/*
  Warnings:

  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paymentId` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - The required column `transactionId` was added to the `Transaction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `course` MODIFY `duration` TIME NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP PRIMARY KEY,
    DROP COLUMN `paymentId`,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `transactionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`transactionId`);

-- CreateTable
CREATE TABLE `PurchasedCourse` (
    `courseMaterialId` VARCHAR(191) NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PurchasedCourse_transactionId_courseId_studentId_key`(`transactionId`, `courseId`, `studentId`),
    PRIMARY KEY (`courseMaterialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`studentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedCourse` ADD CONSTRAINT `PurchasedCourse_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`studentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedCourse` ADD CONSTRAINT `PurchasedCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedCourse` ADD CONSTRAINT `PurchasedCourse_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`transactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;
