/*
  Warnings:

  - You are about to drop the column `guestId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `hostId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_guestId_fkey`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `guestId`,
    ADD COLUMN `hostId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `Guest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
