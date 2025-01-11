-- AlterTable
ALTER TABLE "categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "outlets" ADD CONSTRAINT "outlets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "products" ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "transaction_details" ADD CONSTRAINT "transaction_details_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
