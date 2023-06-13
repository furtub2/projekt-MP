/*
  Warnings:

  - You are about to drop the `Weather` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_userCities` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atitude` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_userCities_B_index";

-- DropIndex
DROP INDEX "_userCities_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Weather";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_userCities";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FavoriteCity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    CONSTRAINT "FavoriteCity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FavoriteCity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cityId" INTEGER
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "atitude" TEXT NOT NULL,
    "country" TEXT NOT NULL
);
INSERT INTO "new_City" ("id", "name") SELECT "id", "name" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteCity_userId_cityId_key" ON "FavoriteCity"("userId", "cityId");
