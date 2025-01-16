/*
  Warnings:

  - You are about to drop the column `slug` on the `outlets` table. All the data in the column will be lost.
  - Added the required column `userId` to the `outlets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "outlets" DROP COLUMN "slug",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "otp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp_code" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "otp_email_idx" ON "otp"("email");

-- AddForeignKey
ALTER TABLE "outlets" ADD CONSTRAINT "outlets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
