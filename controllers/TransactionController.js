import TransactionService from "../services/TransactionService.js";

class TransactionController {
  async add(req, res) {
    try {
      const { totalPayment, paymentMethod, note, sessionId, detail } = req.body;
      const transaction = await TransactionService.addTransaction(
        totalPayment,
        paymentMethod,
        note,
        sessionId,
        detail
      );
      res.status(200).json({
        status: "Success",
        message: "Transaction added successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async void(req, res) {
    try {
      const id = req.params.id;
      const voidedTransaction = await TransactionService.voidTransaction(id);
      res.status(200).json({
        status: "Success",
        message: "Transaction voided successfully"
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async get(req, res) {
    try {
      const transactions = await TransactionService.getAllTransactions();
      res.status(200).json({
        status: "Success",
        message: "Transactions fetched successfully",
        data: transactions,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const transaction = await TransactionService.getTransactionById(id);
      res.status(200).json({
        status: "Success",
        message: "Transaction fetched successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getBySession(req, res) {
    try {
      const { order, id, number } = req.query;
      const sessionId = req.params.sessionId;
      const transactions = await TransactionService.getTransactionsBySession(
        order,
        id,
        number,
        sessionId
      );
      res.status(200).json({
        status: "Success",
        message: "Transactions fetched successfully",
        data: transactions,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
}

export default new TransactionController();
