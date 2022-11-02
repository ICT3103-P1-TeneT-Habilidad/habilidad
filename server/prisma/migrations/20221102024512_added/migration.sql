/*
  Warnings:

  - Added the required column `order` to the `CourseMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coursematerial` ADD COLUMN `order` INTEGER NOT NULL;
