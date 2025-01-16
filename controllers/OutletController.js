import { decodeUserId, getTokenFromHeader } from "../config/jwt.js";
import OutletService from "../services/OutletService.js";

class OutletController {
  async add(req, res) {
    try {
      const token = getTokenFromHeader(req);
      const userId = decodeUserId(token);
      const { name, type, phoneNumber, address, district, city, province } =
        req.body;
      const outlet = await OutletService.addOutlet(
        name,
        type,
        phoneNumber,
        address,
        district,
        city,
        province,
        userId
      );
      res.status(200).json({
        status: "Success",
        message: "Outlet added successfully",
        data: outlet,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  }

  async get(req, res) {
    try {
      const outlets = await OutletService.getAllOutlets();
      res.status(200).json({
        status: "Success",
        message: "Outlets fetched successfully",
        data: outlets,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const outlets = await OutletService.getOutletById(id);
      res.status(200).json({
        status: "Success",
        message: "Outlet fetched successfully",
        data: outlets,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getByUser(req, res) {
    try {
      const token = getTokenFromHeader(req);
      const userId = decodeUserId(token);
      const outlets = await OutletService.getOutletsByUser(userId);
      if (outlets.length === 0) {
        res.status(404).json({
          status: "Error",
          message: "No outlets found for the user",
        });
      } else {
        res.status(200).json({
          status: "Success",
          message: "User outlets fetched successfully",
          data: outlets,
        });
      }
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, type, phoneNumber, address, district, city, province } =
        req.body;
      const image = req.file;
      const outlet = await OutletService.updateOutlet(
        id,
        name,
        type,
        phoneNumber,
        address,
        district,
        city,
        province,
        image
      );
      res.status(200).json({
        status: "Success",
        message: "Outlet updated successfully",
        data: outlet,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await OutletService.deleteOutlet(id);
      res.status(200).json({
        status: "Success",
        message: "Outlet deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
}

export default new OutletController();
