import { PrismaClient } from "@prisma/client";

class ProductModel {
  constructor() {
    this.prisma = new PrismaClient();
  }
  addProduct = async (product) => {
    const newProduct = await this.prisma.product.create({ data: product });
    return newProduct;
  };
  getAllProducts = async () => {
    const products = await this.prisma.product.findMany();
    return products;
  };
}


export default new ProductModel();