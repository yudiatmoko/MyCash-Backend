-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "number" DROP DEFAULT;
DROP SEQUENCE "transactions_number_seq";
