/*
  Warnings:

  - You are about to drop the column `subtitle` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL');

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "subtitle",
DROP COLUMN "title",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sizes";

-- CreateTable
CREATE TABLE "ProductSize" (
    "id" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductSize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductSize_productId_size_key" ON "ProductSize"("productId", "size");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- AddForeignKey
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
