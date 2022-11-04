-- DropForeignKey
ALTER TABLE `CourseMaterial` DROP FOREIGN KEY `CourseMaterial_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `TopicCourse` DROP FOREIGN KEY `TopicCourse_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_courseId_fkey`;

-- AddForeignKey
ALTER TABLE `CourseMaterial` ADD CONSTRAINT `CourseMaterial_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopicCourse` ADD CONSTRAINT `TopicCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;
