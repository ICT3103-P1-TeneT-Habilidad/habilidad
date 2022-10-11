/*
  Warnings:

  - Added the required column `instructorId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `CourseMaterial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Topics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `instructorId` VARCHAR(191) NOT NULL,
    MODIFY `duration` TIME NOT NULL;

-- AlterTable
ALTER TABLE `coursematerial` ADD COLUMN `courseId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `topics` ADD COLUMN `courseId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`instructorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseMaterial` ADD CONSTRAINT `CourseMaterial_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Topics` ADD CONSTRAINT `Topics_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;
