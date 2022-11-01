-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_approvedBy_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_instructorId_fkey`;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_approvedBy_fkey` FOREIGN KEY (`approvedBy`) REFERENCES `Moderator`(`moderatorId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`instructorId`) ON DELETE CASCADE ON UPDATE CASCADE;
