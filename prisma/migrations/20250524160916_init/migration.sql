-- CreateTable
CREATE TABLE `User` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `role` INTEGER NOT NULL DEFAULT 3,
    `uname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_uname_key`(`uname`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `productId` INTEGER NOT NULL AUTO_INCREMENT,
    `productName` VARCHAR(191) NOT NULL,
    `productPrice` VARCHAR(191) NOT NULL,
    `productStock` BIGINT NOT NULL,

    UNIQUE INDEX `Product_productPrice_key`(`productPrice`),
    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCustomer` (
    `prodCustId` INTEGER NOT NULL AUTO_INCREMENT,
    `productPrice` VARCHAR(191) NOT NULL,
    `custProductId` INTEGER NULL,
    `customerCustId` INTEGER NULL,

    UNIQUE INDEX `ProductCustomer_productPrice_key`(`productPrice`),
    PRIMARY KEY (`prodCustId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `custId` INTEGER NOT NULL AUTO_INCREMENT,
    `custName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`custId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expenses` (
    `expenseId` INTEGER NOT NULL AUTO_INCREMENT,
    `detailExpense` TEXT NULL,
    `priceExpense` VARCHAR(191) NOT NULL,
    `dateExpense` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `create_by` VARCHAR(191) NOT NULL,
    `update_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`expenseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductCustomer` ADD CONSTRAINT `ProductCustomer_custProductId_fkey` FOREIGN KEY (`custProductId`) REFERENCES `Product`(`productId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCustomer` ADD CONSTRAINT `ProductCustomer_customerCustId_fkey` FOREIGN KEY (`customerCustId`) REFERENCES `Customer`(`custId`) ON DELETE SET NULL ON UPDATE CASCADE;
