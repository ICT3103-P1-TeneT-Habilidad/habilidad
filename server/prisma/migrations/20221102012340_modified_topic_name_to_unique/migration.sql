/*
  Warnings:

  - A unique constraint covering the columns `[topicName]` on the table `Topics` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `course` MODIFY `language` ENUM('CHINESE', 'ENGLISH', 'FRENCH', 'INDIAN', 'JAPANESE', 'KOREAN', 'MALAY', 'PUNDEK') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Topics_topicName_key` ON `Topics`(`topicName`);
