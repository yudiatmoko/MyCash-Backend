import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import { generateToken } from "../config/jwt.js";

class UserService {
  async registerUser(name, email, password) {
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword };
    const newUser = await UserModel.addUser(user);

    const token = generateToken({ id: newUser.id });
    return { id: newUser.id, name: newUser.name, email: newUser.email, token };
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
    return { id: user.id, name: user.name, email: user.email, token };
  }

  async updateUser(id, name, email, phoneNumber, image) {
    const user = await UserModel.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const existingEmail = await UserModel.getUserByEmail(email);
    if (existingEmail && existingEmail.id !== id) {
      throw new Error("Email already exists");
    }
    const existingPhoneNumber = await UserModel.getUserByPhoneNumber(
      phoneNumber
    );
    if (existingPhoneNumber && existingPhoneNumber.id !== id) {
      throw new Error("Phone number already exists");
    }
    let imagePath = user.image;
    if (image) {
      imagePath = image.filename;
    }
    const newData = {
      name: name || user.name,
      email: email || user.email,
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

  async getAllUsers() {
    const users = await UserModel.getAllUsers();
    return users;
  }

  async deleteUser(id) {
    const deletedUser = await UserModel.deleteUser(id);
    return deletedUser;
  }

  async getUserById(id) {
    const user = await UserModel.getUserById(id);
    return user;
  }
}
export default new UserService();
