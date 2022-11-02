/*
  Warnings:

  - Added the required column `assetId` to the `CourseMaterial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `CourseMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coursematerial` ADD COLUMN `assetId` VARCHAR(191) NOT NULL,
    ADD COLUMN `publicId` VARCHAR(191) NOT NULL;
