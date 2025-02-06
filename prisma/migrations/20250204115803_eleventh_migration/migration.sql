/*
  Warnings:

  - The `userId` column on the `Page` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "userId",
ADD COLUMN     "userId" TEXT[];
