import { deleteImageByFilename } from "../config/file.js";
import OutletModel from "../models/OutletModel.js";
import UserService from "../services/UserService.js";

class OutletService {
  async getAllOutlets() {
    const outlets = await OutletModel.getAllOutlets();
    if (outlets.length === 0) {
      throw new Error("No outlets found");
    }
    return outlets;
  }

  async getOutletById(id) {
    const outlet = await OutletModel.getOutletById(id);
    if (!outlet) {
      throw new Error("Outlet not found");
    }
    return outlet;
  }

  async getOutletsByUser(userId) {
    await UserService.getUserById(userId);
    const outlets = await OutletModel.getOutletsByUserId(userId);
    if (outlets.length === 0) {
      throw new Error("No outlets found for the user");
    }
    return outlets;
  }

  async addOutlet(
    name,
    type,
    phoneNumber,
    address,
    district,
    city,
    province,
    userId
  ) {
    const outlet = {
      name,
      type,
      phoneNumber,
      address,
      district,
      city,
      province,
      userId,
    };
    const newOutlet = await OutletModel.addOutlet(outlet);
    return newOutlet;
  }

  async updateOutlet(
    id,
    name,
    type,
    phoneNumber,
    address,
    district,
    city,
    province,
    image
  ) {
    const existingOutlet = await this.getOutletById(id);
    let imagePath = existingOutlet.image;
    if (image) {
      if (existingOutlet.image) {
        deleteImageByFilename(existingOutlet.image);
      }
      imagePath = image.filename;
    }
    const newData = {
      name: name || existingOutlet.name,
      type: type || existingOutlet.type,
      phoneNumber: phoneNumber || existingOutlet.phoneNumber,
      address: address || existingOutlet.address,
      district: district || existingOutlet.district,
      city: city || existingOutlet.city,
      province: province || existingOutlet.province,
      image: imagePath,
      userId: existingOutlet.userId,
    };
    const updatedOutlet = await OutletModel.updateOutlet(id, newData);
    return updatedOutlet;
  }

  async deleteOutlet(id) {
    const outlet = await this.getOutletById(id);
    if (outlet.image) {
      deleteImageByFilename(outlet.image);
    }
    const deletedOutlet = await OutletModel.deleteOutlet(id);
    return deletedOutlet;
  }
}

export default new OutletService();
