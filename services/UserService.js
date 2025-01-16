import bcrypt from "bcrypt";
import crypto from "crypto";
import UserModel from "../models/UserModel.js";
import OtpModel from "../models/OtpModel.js";
import { generateToken } from "../config/jwt.js";
import sendEmail from "../config/sendEmail.js";
import { deleteImageByFilename } from "../config/file.js";

class UserService {
  async registerUser(name, email, password) {
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword };
    const newUser = await UserModel.addUser(user);

    this.generateOtp(email);

    const token = generateToken({ id: newUser.id });
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isVerified: newUser.isVerified,
      token,
    };
  }

  async generateOtp(email) {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await OtpModel.deleteOtpByEmail(email);
    const otpCode = await OtpModel.createOtp(email, otp, expiresAt);
    const result = await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP code is ${otp}. It will expire in 5 minutes.`
    );
    if (!result && !otpCode) {
      throw new Error("Failed to send OTP");
    }
    return "OTP sent successfully";
  }

  async verifyOtp(email, otp) {
    const otpData = await OtpModel.getOtpByEmail(email);
    if (!otpData) {
      throw new Error("OTP not found");
    }
    if (otpData.otpCode !== otp) {
      throw new Error("Invalid OTP");
    }
    if (otpData.expiresAt < new Date()) {
      throw new Error("OTP has expired");
    }
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    await UserModel.updateUser(user.id, { isVerified: true });
    await OtpModel.deleteOtpByEmail(email);
    return "OTP verified successfully";
  }

  async loginUser(email, password) {
    const user = await UserModel.getUserByEmail(email, password);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({ id: user.id, email: user.email });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      token,
    };
  }

  async updateUser(id, name, phoneNumber, image) {
    const user = await UserModel.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const existingPhoneNumber = await UserModel.getUserByPhoneNumber(
      phoneNumber
    );
    if (existingPhoneNumber && existingPhoneNumber.id !== id) {
      throw new Error("Phone number already exists");
    }
    let imagePath = user.image;
    if (image) {
      if (user.image) {
        deleteImageByFilename(user.image);
      }
      imagePath = image.filename;
    }
    const newData = {
      name: name || user.name,
      phoneNumber: phoneNumber || user.phoneNumber,
      image: imagePath,
    };
    const updatedUser = await UserModel.updateUser(id, newData);
    return updatedUser;
  }

  async updatePassword(id, oldPassword, newPassword) {
    const user = await UserModel.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid old password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await UserModel.updateUser(id, {
      password: hashedPassword,
    });
    return updatedUser;
  }

  async resetPassword(email, newPassword) {
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await UserModel.updateUser(user.id, {
      password: hashedPassword,
    });
    return updatedUser;
  }

  async getAllUsers() {
    const users = await UserModel.getAllUsers();
    return users;
  }

  async deleteUser(id) {
    const user = await UserModel.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.image) {
      deleteImageByFilename(user.image);
    }
    const deletedUser = await UserModel.deleteUser(id);
    return deletedUser;
  }

  async getUserById(id) {
    const user = await UserModel.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
export default new UserService();
