/*
  Warnings:

  - Added the required column `hasStarted` to the `poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `poll` ADD COLUMN `hasStarted` BOOLEAN NOT NULL;
