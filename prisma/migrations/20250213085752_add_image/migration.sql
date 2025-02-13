-- CreateTable
CREATE TABLE "SessionImage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "SessionImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionImage" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "TransactionImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionImage" ADD CONSTRAINT "SessionImage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionImage" ADD CONSTRAINT "TransactionImage_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
