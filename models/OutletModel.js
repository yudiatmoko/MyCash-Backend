import { PrismaClient } from "@prisma/client";

class OutletModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllOutlets = async () => {
    const outlets = await this.prisma.outlet.findMany();
    return outlets;
  };

  getOutletById = async (id) => {
    const outlet = await this.prisma.outlet.findUnique({
      where: { id },
    });
    return outlet;
  };

  getOutletsByUserId = async (userId) => {
    const outlets = await this.prisma.outlet.findMany({
      where: { userId },
    });
    return outlets;
  };

  addOutlet = async (outlet) => {
    const newOutlet = await this.prisma.outlet.create({ data: outlet });
    return newOutlet;
  };

  updateOutlet = async (id, outlet) => {
    const updatedOutlet = await this.prisma.outlet.update({
      where: { id },
      data: outlet,
    });
    return updatedOutlet;
  };

  deleteOutlet = async (id) => {
    const deletedOutlet = await this.prisma.outlet.delete({
      where: { id },
    });
    return deletedOutlet;
  };
}

export default new OutletModel();
