import RecapService from "../services/RecapService.js";

class RecapController {
  async getSessionRecap(req, res) {
    try {
      const { startDate, endDate, order } = req.query;
      const outletId = req.params.outletId
      const recap = await RecapService.getSessionRecap(
        startDate,
        endDate,
        order,
        outletId
      );
      res.status(200).json({
        status: "Success",
        message: "Recap retrieved successfully",
        data: recap,
      });
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: error.message,
      });
    }
  }
}

export default new RecapController();
