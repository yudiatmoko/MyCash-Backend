/*
  Warnings:

  - You are about to drop the `SessionImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SessionImage" DROP CONSTRAINT "SessionImage_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionImage" DROP CONSTRAINT "TransactionImage_transactionId_fkey";

-- DropTable
DROP TABLE "SessionImage";

-- DropTable
DROP TABLE "TransactionImage";

-- CreateTable
CREATE TABLE "sessionImage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "sessionImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactionImage" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "transactionImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sessionImage" ADD CONSTRAINT "sessionImage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactionImage" ADD CONSTRAINT "transactionImage_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
