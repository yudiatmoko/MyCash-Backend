-- DropForeignKey
ALTER TABLE "sessionImage" DROP CONSTRAINT "sessionImage_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "transactionImage" DROP CONSTRAINT "transactionImage_transactionId_fkey";

-- AddForeignKey
ALTER TABLE "sessionImage" ADD CONSTRAINT "sessionImage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactionImage" ADD CONSTRAINT "transactionImage_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
