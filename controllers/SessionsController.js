import SessionService from "../services/SessionService.js";

class SessionController {
  async add(req, res) {
    try {
      const { date, shift, startingCash, userId, outletId } = req.body;
      const session = await SessionService.addSession(
        date,
        shift,
        startingCash,
        userId,
        outletId
      );
      res.status(200).json({
        status: "Success",
        message: "Session added successfully",
        data: session,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const sessions = await SessionService.getAllSessions();
      res.status(200).json({
        status: "Success",
        message: "Sessions fetched successfully",
        data: sessions,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const session = await SessionService.getSessionById(id);
      res.status(200).json({
        status: "Success",
        message: "Session fetched successfully",
        data: session,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getByOutlet(req, res) {
    try {
      const outletId = req.params.outletId;
      const sessions = await SessionService.getSessionsByOutlet(outletId);
      res.status(200).json({
        status: "Success",
        message: "Sessions fetched successfully",
        data: sessions,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const { date, shift, startingCash, totalRevenue, checkOutTime } =
        req.body;
      const session = await SessionService.updateSession(
        id,
        date,
        shift,
        startingCash,
        totalRevenue,
        checkOutTime
      );
      res.status(200).json({
        status: "Success",
        message: "Session updated successfully",
        data: session,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await SessionService.deleteSession(id);
      res.status(200).json({
        status: "Success",
        message: "Session deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
}

export default new SessionController();
