import { PrismaClient } from "@prisma/client";

class TransactionModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  addTransaction = async (transaction) => {
    const newTransaction = await this.prisma.transaction.create({
      data: transaction,
    });
    return newTransaction;
  };

  addTransactionDetail = async (transactionId, details) => {
    const newDetails = await this.prisma.transactionDetail.createMany({
      data: details.map((detail) => ({
        transactionId: transactionId,
        productId: detail.productId,
        productName: detail.productName,
        productQty: detail.productQty,
        productPrice: detail.productPrice,
        totalPrice: detail.totalPrice,
      })),
    });
    return newDetails;
  };

  updateTransaction = async (id, transaction) => {
    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: transaction,
    });
    return updatedTransaction;
  };

  getAllTransactions = async () => {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        details: true,
        session: {
          select: {
            date: true,
            shift: true,
            user: {
              select: {
                name: true,
              },
            },
            outlet: {
              select: {
                name: true,
                phoneNumber: true,
                address: true,
                district: true,
                city: true,
                province: true,
              },
            },
          },
        },
      },
    });
    const sortedTransactions = transactions.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sortedTransactions;
  };

  getTransactionById = async (id) => {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        details: true,
        session: {
          select: {
            date: true,
            shift: true,
            user: {
              select: {
                name: true,
              },
            },
            outlet: {
              select: {
                name: true,
                phoneNumber: true,
                address: true,
                district: true,
                city: true,
                province: true,
              },
            },
          },
        },
      },
    });
    return transaction;
  };

  getTransactionsBySession = async (sessionId) => {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        sessionId,
      },
      include: {
        details: true,
        session: {
          select: {
            date: true,
            shift: true,
            user: {
              select: {
                name: true,
              },
            },
            outlet: {
              select: {
                name: true,
                phoneNumber: true,
                address: true,
                district: true,
                city: true,
                province: true,
              },
            },
          },
        },
      },
    });
    const sortedTransactions = transactions.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sortedTransactions;
  };

  getNextTransactionNumber = async (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const lastTransaction = await this.prisma.transaction.findFirst({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        number: "desc",
      },
    });
    return lastTransaction ? lastTransaction.number + 1 : 1;
  };
}

export default new TransactionModel();
