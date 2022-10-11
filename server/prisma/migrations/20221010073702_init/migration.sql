-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phoneNumber` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `deActivatedOn` DATETIME(3) NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedOn` DATETIME(3) NOT NULL,
    `role` ENUM('User', 'Student', 'Instructor', 'Moderator', 'Employees', 'Administrators') NOT NULL,

    UNIQUE INDEX `User_email_phoneNumber_key`(`email`, `phoneNumber`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `courseId` VARCHAR(191) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,
    `duration` TIME NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `language` ENUM('Chinese', 'English', 'French', 'Indian', 'Japanese', 'Korean', 'Malay') NOT NULL,
    `status` ENUM('InProgress', 'Pending', 'Completed', 'Approved', 'Ongoing', 'Started') NOT NULL,
    `approvalStatus` ENUM('InProgress', 'Pending', 'Completed', 'Approved', 'Ongoing', 'Started') NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedOn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseMaterial` (
    `courseMaterialId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`courseMaterialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `paymentId` VARCHAR(191) NOT NULL,
    `status` ENUM('InProgress', 'Pending', 'Completed', 'Approved', 'Ongoing', 'Started') NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`paymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topics` (
    `topicId` VARCHAR(191) NOT NULL,
    `topicName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`topicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
