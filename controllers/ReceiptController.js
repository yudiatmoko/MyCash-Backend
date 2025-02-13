import ReceiptImageService from "../services/ReceiptImageService.js";

class ReceiptImageController {
  async createSessionImage(req, res) {
    const image = req.file;
    const sessionId = req.params.sessionId;
    const sessionImage = await ReceiptImageService.uploadSessionImage(
      image,
      sessionId
    );
    res.status(200).json({
      status: "Success",
      message: "Session image uploaded successfully",
      data: sessionImage,
    });
  }

  async createTransactionImage(req, res) {
    const image = req.file;
    const transactionId = req.params.transactionId;
    const transactionImage = await ReceiptImageService.uploadTransactionImage(
      image,
      transactionId
    );
    res.status(200).json({
      status: "Success",
      message: "Transaction image uploaded successfully",
      data: transactionImage,
    });
  }
}

export default new ReceiptImageController();
