import prisma from "../config/prisma.js";

class OtpModel {
  constructor() {
    this.prisma = prisma;
  }

  createOtp = async (email, otpCode, expiresAt) => {
    const result = await this.prisma.otp.create({
      data: { email, otpCode, expiresAt },
    });
    return result;
  };

  getOtpByEmail = async (email) => {
    const result = await this.prisma.otp.findFirst({
      where: { email },
    });
    return result;
  };

  deleteOtpByEmail = async (email) => {
    const result = await this.prisma.otp.deleteMany({
      where: { email },
    });
    return result;
  };
}

export default new OtpModel();
