import CategoryModel from "../models/CategoryModel.js";

class CategoryService {
  async addCategory(name, outletId) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const category = {
      name,
      slug,
      outletId,
    };
    const newCategory = await CategoryModel.addCategory(category);
    return newCategory;
  }
  async getAllCategories() {
    const categories = await CategoryModel.getAllCategories();
    if (categories.length === 0) {
      throw new Error("Categories not found");
    }
    return categories;
  }
  async getCategoryById(id) {
    const category = await CategoryModel.getCategoryById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }
  async getCategoriesByOutlet(outletId, name) {
    const categories = await CategoryModel.getCategoriesByOutlet(outletId, {
      name,
    });
    if (categories.length === 0) {
      throw new Error("No categories found for the outlet");
    }
    return categories;
  }
  async deleteCategory(id) {
    await this.getCategoryById(id);
    const deletedCategory = await CategoryModel.deleteCategory(id);
    return deletedCategory;
  }
}

export default new CategoryService();
