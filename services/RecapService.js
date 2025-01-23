import SessionModel from "../models/SessionModel.js";

class RecapService {
  async getSessionRecap(startDate, endDate, order, outletId) {
    if (!startDate || !endDate) {
      throw new Error("Start date and end date are required");
    }
    const recap = await SessionModel.getSessionRecap(
      {
        startDate,
        endDate,
        order,
      },
      outletId
    );
    if (recap.details.length === 0) {
      throw new Error("No records found within the given date range");
    }
    return recap;
  }
}

export default new RecapService();
