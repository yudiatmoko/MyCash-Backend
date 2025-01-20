import ProductService from "../services/ProductService.js";

class ProductController {
  async add(req, res) {
    try {
      const { name, description, price, status, stock, categoryId, outletId } = req.body;
      const image = req.file;
      const product = await ProductService.addProduct(
        name,
        description,
        price,
        status,
        stock,
        categoryId,
        outletId,
        image
      );
      res.status(200).json({
        status: "Success",
        message: "Product added successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  }

  async get(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({
        status: "Success",
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getByOutlet(req, res) {
    try {
      const products = await ProductService.getProductsByOutlet(
        req.params.outletId
      );
      res.status(200).json({
        status: "Success",
        message: "Outlet products fetched successfully",
        data: products,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const product = await ProductService.getProductById(id);
      res.status(200).json({
        status: "Success",
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getByCategory(req, res) {
    try {
      const slug = req.params.slug;
      const product = await ProductService.getProductsByCategory(slug);
      res.status(200).json({
        status: "Success",
        message: "Products fetched successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { name, description, price, status, stock, categoryId } = req.body;
      const image = req.file;
      const product = await ProductService.updateProduct(
        req.params.id,
        name,
        description,
        price,
        status,
        stock,
        categoryId,
        image
      );
      res.status(200).json({
        status: "Success",
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await ProductService.deleteProduct(id);
      res.status(200).json({
        status: "Success",
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
}

export default new ProductController();
