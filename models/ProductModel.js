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

  getProductById = async (id) => {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product;
  };

  getProductsByOutlet = async (outletId, query) => {
    const { name, slug, status } = query;
    const products = await this.prisma.product.findMany({
      where: {
        outletId,
        name: { contains: name, mode: "insensitive" },
        category: { slug: slug },
        status: status === "true" ? true : status === "false" ? false : null,
      },
      orderBy: { name: "asc" },
    });
    return products;
  };

  getProductsByCategory = async (outletId, slug) => {
    const products = await this.prisma.product.findMany({
      where: {
        outletId,
        category: {
          slug: slug,
        },
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    return products;
  };

  updateProduct = async (id, product) => {
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: product,
    });
    return updatedProduct;
  };

  deleteProduct = async (id) => {
    const deletedProduct = await this.prisma.product.delete({
      where: { id },
    });
    return deletedProduct;
  };
}

export default new ProductModel();
