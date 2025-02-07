import { PrismaClient } from "@prisma/client";

class CategoryModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  addCategory = async (category) => {
    const newCategory = await this.prisma.category.create({ data: category });
    return newCategory;
  };

  getAllCategories = async () => {
    const categories = await this.prisma.category.findMany();
    return categories;
  };

  getCategoryById = async (id) => {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return category;
  };

  getCategoriesByOutlet = async (outletId, query) => {
    const { name } = query;
    const categories = await this.prisma.category.findMany({
      where: { outletId, name: { contains: name, mode: "insensitive" } },
      orderBy: { name: "asc" },
    });
    return categories;
  };

  deleteCategory = async (id) => {
    const deletedCategory = await this.prisma.category.delete({
      where: { id },
    });
    return deletedCategory;
  };
}

export default new CategoryModel();
