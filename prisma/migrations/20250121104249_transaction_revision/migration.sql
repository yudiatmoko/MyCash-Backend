/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "isVoided" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "transactions_number_key" ON "transactions"("number");
