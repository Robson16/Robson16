/*
  Warnings:

  - You are about to drop the column `description` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `challenge` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `impact` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `solution` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Skill` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Skill_name_key";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "description",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "challenge",
DROP COLUMN "description",
DROP COLUMN "impact",
DROP COLUMN "solution",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "ProjectTranslation" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "challenge" TEXT,
    "solution" TEXT,
    "impact" TEXT,

    CONSTRAINT "ProjectTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillTranslation" (
    "id" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SkillTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceTranslation" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ExperienceTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTranslation_projectId_locale_key" ON "ProjectTranslation"("projectId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "SkillTranslation_skillId_locale_key" ON "SkillTranslation"("skillId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceTranslation_experienceId_locale_key" ON "ExperienceTranslation"("experienceId", "locale");

-- AddForeignKey
ALTER TABLE "ProjectTranslation" ADD CONSTRAINT "ProjectTranslation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTranslation" ADD CONSTRAINT "SkillTranslation_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceTranslation" ADD CONSTRAINT "ExperienceTranslation_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
