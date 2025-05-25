/*
  Warnings:

  - You are about to drop the column `customerCustId` on the `productcustomer` table. All the data in the column will be lost.
  - You are about to drop the column `productPrice` on the `productcustomer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productSellPrice]` on the table `ProductCustomer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `create_by` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `create_by` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `create_by` to the `ProductCustomer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSellPrice` to the `ProductCustomer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `ProductCustomer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productcustomer` DROP FOREIGN KEY `ProductCustomer_customerCustId_fkey`;

-- DropIndex
DROP INDEX `ProductCustomer_customerCustId_fkey` ON `productcustomer`;

-- DropIndex
DROP INDEX `ProductCustomer_productPrice_key` ON `productcustomer`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `create_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `update_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `product` ADD COLUMN `create_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `update_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `productcustomer` DROP COLUMN `customerCustId`,
    DROP COLUMN `productPrice`,
    ADD COLUMN `create_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `custId` INTEGER NULL,
    ADD COLUMN `productSellPrice` VARCHAR(191) NOT NULL,
    ADD COLUMN `update_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `update_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Order` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NULL,
    `orderDate` VARCHAR(191) NOT NULL,
    `orderQty` VARCHAR(191) NOT NULL,
    `orderNumber` TEXT NOT NULL,
    `orderPrice` VARCHAR(191) NOT NULL,
    `orderStatus` INTEGER NOT NULL DEFAULT 1,
    `orderPaymentType` INTEGER NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `create_by` VARCHAR(191) NOT NULL,
    `update_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `tansactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `detailExpense` TEXT NULL,
    `priceExpense` VARCHAR(191) NOT NULL,
    `dateExpense` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `create_by` VARCHAR(191) NOT NULL,
    `update_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tansactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ProductCustomer_productSellPrice_key` ON `ProductCustomer`(`productSellPrice`);

-- AddForeignKey
ALTER TABLE `ProductCustomer` ADD CONSTRAINT `ProductCustomer_custId_fkey` FOREIGN KEY (`custId`) REFERENCES `Customer`(`custId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE SET NULL ON UPDATE CASCADE;
