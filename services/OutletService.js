import OutletModel from "../models/OutletModel.js";
import UserService from "../services/UserService.js";
import {
  uploadBufferToCloudinary,
  destroyImageFromCloudinary,
  extractPublicIdFromUrl,
} from "../config/cloudinary.js";

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

  async getOutletsByUser(userId, name) {
    await UserService.getUserById(userId);
    const outlets = await OutletModel.getOutletsByUserId(userId, { name });
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
    let imageUrl = existingOutlet.image;
    if (image) {
      if (existingOutlet.image) {
        try {
          const publicId = extractPublicIdFromUrl(existingOutlet.image);
          await destroyImageFromCloudinary(publicId);
        } catch (error) {
          console.error(
            "Failed to delete previous image from Cloudinary:",
            error.message
          );
        }
      }
      const result = await uploadBufferToCloudinary(image.buffer, {
        folder: "public",
      });
      imageUrl = result.secure_url;
    }
    const newData = {
      name: name || existingOutlet.name,
      type: type || existingOutlet.type,
      phoneNumber: phoneNumber || existingOutlet.phoneNumber,
      address: address || existingOutlet.address,
      district: district || existingOutlet.district,
      city: city || existingOutlet.city,
      province: province || existingOutlet.province,
      image: image ? imageUrl : existingOutlet.image,
      userId: existingOutlet.userId,
    };
    const updatedOutlet = await OutletModel.updateOutlet(id, newData);
    return updatedOutlet;
  }

  async deleteOutlet(id) {
    const outlet = await this.getOutletById(id);
    if (outlet.image) {
      try {
        const publicId = extractPublicIdFromUrl(outlet.image);
        await destroyImageFromCloudinary(publicId);
      } catch (error) {
        console.error(
          "Failed to delete previous image from Cloudinary:",
          error.message
        );
      }
    }
    const deletedOutlet = await OutletModel.deleteOutlet(id);
    return deletedOutlet;
  }
}

export default new OutletService();
