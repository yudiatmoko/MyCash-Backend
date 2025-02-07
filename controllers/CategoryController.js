import CategoryService from "../services/CategoryService.js";

class CategoryController {
  async add(req, res) {
    try {
      const category = await CategoryService.addCategory(
        req.body.name,
        req.body.outletId
      );
      res.status(200).json({
        status: "Success",
        message: "Category added successfully",
        data: category,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async get(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json({
        status: "Success",
        message: "Categories fetched successfully",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const categories = await CategoryService.getCategoryById(id);
      res.status(200).json({
        status: "Success",
        message: "Category fetched successfully",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getByOutlet(req, res) {
    try {
      const name = req.query.name;
      const outletId = req.params.outletId;
      const categories = await CategoryService.getCategoriesByOutlet(
        outletId,
        name
      );
      res.status(200).json({
        status: "Success",
        message: "Outlet categories fetched successfully",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await CategoryService.deleteCategory(id);
      res.status(200).json({
        status: "Success",
        message: "Category deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
}

export default new CategoryController();
