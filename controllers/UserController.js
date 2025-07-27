import UserService from "../services/UserService.js";

class UserController {
  async register(req, res) {
    try {
      const user = await UserService.registerUser(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.accessCode
      );
      res.status(200).json({
        status: "Success",
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async generateOtp(req, res) {
    try {
      const result = await UserService.generateOtp(req.body.email);
      res.status(200).json({
        status: "Success",
        message: result,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async verifyOtp(req, res) {
    try {
      const result = await UserService.verifyOtp(req.body.email, req.body.otp);
      res.status(200).json({
        status: "Success",
        message: result,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async login(req, res) {
    try {
      const user = await UserService.loginUser(
        req.body.email,
        req.body.password
      );
      res.status(200).json({
        status: "Success",
        message: "User logged in successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, phoneNumber } = req.body;
      const image = req.file;
      const user = await UserService.updateUser(id, name, phoneNumber, image);
      res.status(200).json({
        status: "Success",
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async updatePassword(req, res) {
    try {
      const user = await UserService.updatePassword(
        req.params.id,
        req.body.oldPassword,
        req.body.newPassword
      );
      res.status(200).json({
        status: "Success",
        message: "User password updated successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async get(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        status: "Success",
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      await UserService.verifyOtp(req.body.email, req.body.otp);
      await UserService.resetPassword(req.body.email, req.body.newPassword);
      res.status(200).json({
        status: "Success",
        message: "Password reset successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
}

export default new UserController();
