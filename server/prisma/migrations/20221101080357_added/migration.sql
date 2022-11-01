/*
  Warnings:

  - Added the required column `imageAssetId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePublicId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `imageAssetId` VARCHAR(191) NOT NULL,
    ADD COLUMN `imagePublicId` VARCHAR(191) NOT NULL;
