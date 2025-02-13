import ReceiptImageModel from "../models/ReceiptImageModel.js";
import { uploadBufferToCloudinary } from "../config/cloudinary.js";

class ReceiptImageService {
  async uploadSessionImage(sessionImage, sessionId) {
    const exsistingImage = await ReceiptImageModel.getImageBySessionId(
      sessionId
    );
    if (exsistingImage) {
      return exsistingImage;
    } else {
      let imageUrl = null;
      if (sessionImage) {
        const result = await uploadBufferToCloudinary(sessionImage.buffer, {
          folder: "settlement",
        });
        imageUrl = result.secure_url;
      }
      const data = {
        sessionId: sessionId,
        image: imageUrl,
      };
      const newImage = await ReceiptImageModel.addSessionImage(data);
      return newImage;
    }
  }

  async uploadTransactionImage(transactionImage, transactionId) {
    const exsistingImage = await ReceiptImageModel.getImageByTransactionId(
      transactionId
    );
    if (exsistingImage) {
      return exsistingImage;
    } else {
      let imageUrl = null;
      if (transactionImage) {
        const result = await uploadBufferToCloudinary(transactionImage.buffer, {
          folder: "receipt",
        });
        imageUrl = result.secure_url;
      }
      const data = {
        transactionId: transactionId,
        image: imageUrl,
      };
      const newImage = await ReceiptImageModel.addTransactionImage(data);
      return newImage;
    }
  }
}

export default new ReceiptImageService();
