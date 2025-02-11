import { PrismaClient, Shift } from "@prisma/client";
import { check } from "express-validator";

class SessionModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  addSession = async (session) => {
    const newSession = await this.prisma.session.create({ data: session });
    return newSession;
  };

  getAllSessions = async () => {
    const sessions = await this.prisma.session.findMany();
    const sortedSessions = sessions.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sortedSessions;
  };

  getSessionsByOutlet = async (outletId) => {
    const sessions = await this.prisma.session.findMany({
      where: { outletId },
    });
    const sortedSessions = sessions.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sortedSessions;
  };

  getSessionById = async (id) => {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        outlet: {
          select: {
            name: true,
            address: true,
            city: true,
            phoneNumber: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        transactions: {
          select: {
            id: true,
            totalPrice: true,
            paymentMethod: true,
            isVoided: true,
            details: {
              select: {
                productId: true,
                productQty: true,
                product: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const successfulTransactions = session.transactions.filter(
      (transaction) => !transaction.isVoided
    ).length;
    const voidedTransactions = session.transactions.filter(
      (transaction) => transaction.isVoided
    ).length;
    const totalRevenue = session.transactions.reduce(
      (total, transaction) =>
        !transaction.isVoided ? total + transaction.totalPrice : total,
      0
    );
    const paymentSummary = session.transactions.reduce(
      (summary, transaction) => {
        if (!transaction.isVoided) {
          if (transaction.paymentMethod === "QRIS")
            summary.qris += transaction.totalPrice;
          if (transaction.paymentMethod === "CASH")
            summary.cash += transaction.totalPrice;
        }
        return summary;
      },
      { qris: 0, cash: 0 }
    );

    const data = {
      id: session.id,
      date: session.date,
      shift: session.shift,
      startingCash: session.startingCash,
      totalRevenue: totalRevenue,
      checkInTime: session.checkInTime,
      checkOutTime: session.checkOutTime,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      user: session.user,
      outlet: session.outlet,
      totalTransactions: session.transactions.length,
      successfulTransactions,
      voidedTransactions,
      totalRevenue,
      paymentSummary,
    };
    return data;
  };

  updateSession = async (id, session) => {
    const updatedSession = await this.prisma.session.update({
      where: { id },
      data: session,
    });
    return updatedSession;
  };

  deleteSession = async (id) => {
    const deletedSession = await this.prisma.session.delete({
      where: { id },
    });
    return deletedSession;
  };

  getSessionRecap = async (query, outletId) => {
    const { startDate, endDate, order = "desc" } = query;
    const sessions = await this.prisma.session.findMany({
      where: {
        outletId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: {
        date: order,
      },
      include: {
        transactions: {
          select: {
            id: true,
            totalPrice: true,
            paymentMethod: true,
            isVoided: true,
            details: {
              select: {
                productId: true,
                productQty: true,
                product: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const sessionRecaps = sessions.map((session) => {
      const successfulTransactions = session.transactions.filter(
        (transaction) => !transaction.isVoided
      ).length;
      const voidedTransactions = session.transactions.filter(
        (transaction) => transaction.isVoided
      ).length;
      const totalRevenue = session.transactions.reduce(
        (total, transaction) =>
          !transaction.isVoided ? total + transaction.totalPrice : total,
        0
      );
      const paymentSummary = session.transactions.reduce(
        (summary, transaction) => {
          if (!transaction.isVoided) {
            if (transaction.paymentMethod === "QRIS")
              summary.qris += transaction.totalPrice;
            if (transaction.paymentMethod === "CASH")
              summary.cash += transaction.totalPrice;
          }
          return summary;
        },
        { qris: 0, cash: 0 }
      );

      return {
        sessionId: session.id,
        date: session.date,
        totalTransactions: session.transactions.length,
        successfulTransactions,
        voidedTransactions,
        startingCash: session.startingCash,
        totalRevenue,
        paymentSummary,
      };
    });

    const globalRecap = sessions.reduce(
      (global, session) => {
        session.transactions.forEach((transaction) => {
          if (!transaction.isVoided) {
            global.totalRevenue += transaction.totalPrice;
            if (transaction.paymentMethod === "QRIS")
              global.paymentSummary.qris += transaction.totalPrice;
            if (transaction.paymentMethod === "CASH")
              global.paymentSummary.cash += transaction.totalPrice;

            transaction.details.forEach((item) => {
              if (!global.products[item.productId]) {
                global.products[item.productId] = {
                  name: item.product.name,
                  quantity: 0,
                };
              }
              global.products[item.productId].quantity += item.productQty;
            });
            global.successfulTransactions += 1;
          } else {
            global.voidedTransactions += 1;
          }
        });
        global.totalTransactions += session.transactions.length;
        return global;
      },
      {
        totalRevenue: 0,
        totalTransactions: 0,
        successfulTransactions: 0,
        voidedTransactions: 0,
        paymentSummary: { qris: 0, cash: 0 },
        products: {},
      }
    );

    const topProducts = Object.values(globalRecap.products)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      details: {
        startDate,
        endDate,
        totalSessions: sessions.length,
        totalTransactions: globalRecap.totalTransactions,
        successfulTransactions: globalRecap.successfulTransactions,
        voidedTransactions: globalRecap.voidedTransactions,
        totalRevenue: globalRecap.totalRevenue,
        paymentSummary: globalRecap.paymentSummary,
      },
      topProducts,
      session: sessionRecaps,
    };
  };
}

export default new SessionModel();
