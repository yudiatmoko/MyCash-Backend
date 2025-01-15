import { PrismaClient } from "@prisma/client";

class UserModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllUsers = async () => {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        image: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  };

  getUserById = async (id) => {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        image: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  };

  getUserByEmail = async (email) => {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  };

  getUserByPhoneNumber = async (phoneNumber) => {
    const user = await this.prisma.user.findUnique({ where: { phoneNumber } });
    return user;
  };

  addUser = async (user) => {
    const addedUser = await this.prisma.user.create({ data: user });
    return addedUser;
  };

  updateUser = async (id, user) => {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });
    return updatedUser;
  };

  deleteUser = async (id) => {
    const deletedUser = await this.prisma.user.delete({ where: { id } });
    return deletedUser;
  };
}

export default new UserModel();
