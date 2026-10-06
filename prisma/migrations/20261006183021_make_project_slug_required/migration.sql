/*
  Warnings:

  - Made the column `slug` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/

-- Fill in production projects with your own ID temporarily.
UPDATE "Project" SET "slug" = "id" WHERE "slug" IS NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "slug" SET NOT NULL;
