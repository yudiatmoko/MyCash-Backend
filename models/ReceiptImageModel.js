import { PrismaClient } from "@prisma/client";

class ReceiptImageModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  addSessionImage = async (sessionImage) => {
    const newSessionImage = await this.prisma.sessionImage.create({
      data: sessionImage,
    });
    return newSessionImage;
  };

  getImageBySessionId = async (sessionId) => {
    const sessionImage = await this.prisma.sessionImage.findFirst({
      where: { sessionId },
    });
    return sessionImage;
  };

  addTransactionImage = async (transactionImage) => {
    const newTransactionImage = await this.prisma.transactionImage.create({
      data: transactionImage,
    });
    return newTransactionImage;
  };

  getImageByTransactionId = async (transactionId) => {
    const transactionImage = await this.prisma.transactionImage.findFirst({
      where: { transactionId },
    });
    return transactionImage;
  };
}

export default new ReceiptImageModel();
