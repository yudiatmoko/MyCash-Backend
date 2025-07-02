import TransactionModel from "../models/TransactionModel.js";
import ProductService from "./ProductService.js";
import SessionService from "./SessionService.js";
import generateTransactionId from "../config/generateTransactionId.js";

class TransactionService {
  async addTransaction(totalPayment, paymentMethod, note, sessionId, detail) {
    await SessionService.getSessionById(sessionId);
    const details = await Promise.all(
      detail.map(async (item) => {
        const existingProduct = await ProductService.getProductById(
          item.productId
        );
        if (!existingProduct.status) {
          throw new Error(`Product "${existingProduct.name}" is not available`);
        }
        if (existingProduct.stock !== null) {
          if (existingProduct.stock === 0) {
            throw new Error(
              `Product "${existingProduct.name}" is out of stock.`
            );
          }
          if (item.productQty > existingProduct.stock) {
            throw new Error(
              `Not enough stock for product "${existingProduct.name}". Available stock: ${existingProduct.stock}.`
            );
          }
          const newStock = existingProduct.stock - item.productQty;
          await ProductService.updateProductStock(existingProduct.id, newStock);
        }
        return {
          productId: item.productId,
          productName: existingProduct.name,
          productQty: item.productQty,
          productPrice: existingProduct.price,
          totalPrice: item.productQty * existingProduct.price,
        };
      })
    );
    const totalPrice = details.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    if (totalPayment < totalPrice) {
      throw new Error("Total payment is less than total price");
    }
    const totalCharge = totalPayment - totalPrice;
    const transactionDate = new Date(Date.now());
    const nextNumber = await TransactionModel.getNextTransactionNumber(
      transactionDate
    );
    const session = await SessionService.getSessionById(sessionId);
    const outletName = session.outlet.name;
    const id = generateTransactionId(outletName, transactionDate, nextNumber);
    const transaction = {
      id: id,
      number: nextNumber,
      date: transactionDate,
      totalPrice,
      totalPayment,
      totalCharge,
      paymentMethod,
      note: note || null,
      sessionId: sessionId,
    };
    await SessionService.updateRevenue(sessionId, totalPrice);
    const newTransaction = await TransactionModel.addTransaction(transaction);
    await TransactionModel.addTransactionDetail(newTransaction.id, details);
    const result = {
      transactionId: newTransaction.id,
    };
    return result;
  }

  async voidTransaction(id) {
    const transaction = await this.getTransactionById(id);
    for (const detail of transaction.details) {
      const product = await ProductService.getProductById(detail.productId);
      if (product && product.stock !== null) {
        await ProductService.updateProductStock(
          detail.productId,
          product.stock + detail.productQty
        );
      }
    }
    await SessionService.updateRevenue(
      transaction.sessionId,
      -transaction.totalPrice
    );
    const updatedTransaction = await TransactionModel.updateTransaction(id, {
      isVoided: true,
    });
    return updatedTransaction;
  }

  async getAllTransactions() {
    const transactions = await TransactionModel.getAllTransactions();
    if (transactions.length === 0) {
      throw new Error("No transactions found");
    }
    return transactions;
  }

  async getTransactionById(id) {
    const transaction = await TransactionModel.getTransactionById(id);
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return transaction;
  }

  async getTransactionsBySession(order, number, sessionId) {
    const transactions = await TransactionModel.getTransactionsBySession(
      { order, number },
      sessionId
    );
    if (transactions.length === 0) {
      throw new Error("No transactions found for this session");
    }
    return transactions;
  }
}

export default new TransactionService();
