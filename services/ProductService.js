import ProductModel from "../models/ProductModel.js";
import OutletService from "../services/OutletService.js";
import CategoryService from "../services/CategoryService.js";
import { deleteImageByFilename } from "../config/file.js";

class ProductService {
  async addProduct(
    name,
    description,
    price,
    status,
    stock,
    categoryId,
    outletId,
    image
  ) {
    await CategoryService.getCategoryById(categoryId);
    await OutletService.getOutletById(outletId);
    const floatPrice = parseFloat(price);
    if (isNaN(price) || price <= 0) {
      throw new Error("Price must be a positive number");
    }
    const intStock = stock ? parseInt(stock, 10) : null;
    if (stock < 0) {
      throw new Error("Stock must be a non-negative integer");
    }
    const booleanStatus = status === "true" ? true : false;
    const product = {
      name,
      description,
      price: floatPrice,
      status: booleanStatus,
      stock: intStock,
      categoryId,
      outletId,
      image: image.filename,
    };
    const newProduct = await ProductModel.addProduct(product);
    return newProduct;
  }

  async getAllProducts() {
    const products = await ProductModel.getAllProducts();
    if (products.length === 0) {
      throw new Error("No products found");
    }
    return products;
  }

  async getProductById(id) {
    const product = await ProductModel.getProductById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async getProductsByOutlet(outletId) {
    await OutletService.getOutletById(outletId);
    const products = await ProductModel.getProductsByOutlet(outletId);
    if (products.length === 0) {
      throw new Error("No products found for the outlet");
    }
    return products;
  }

  async getProductsByCategory(slug) {
    const products = await ProductModel.getProductsByCategory(slug);
    if (products.length === 0) {
      throw new Error("No products found for the category");
    }
    return products;
  }

  async updateProduct(
    id,
    name,
    description,
    price,
    status,
    stock,
    categoryId,
    image
  ) {
    const existingProduct = await this.getProductById(id);
    const floatPrice = price ? parseFloat(price) : existingProduct.price;
    if (price && (isNaN(floatPrice) || floatPrice <= 0)) {
      throw new Error("Price must be a positive number");
    }
    const intStock = stock ? parseInt(stock, 10) : existingProduct.stock;
    if (stock && intStock < 0) {
      throw new Error("Stock must be a non-negative integer");
    }
    const booleanStatus = status === "true" ? true : status === "false" ? false : null;
    let imagePath = existingProduct.image;
    if (image) {
      if (existingProduct.image) {
        deleteImageByFilename(existingProduct.image);
      }
      imagePath = image.filename;
    }
    const product = {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: floatPrice !== null ? floatPrice : existingProduct.price,
      status: booleanStatus !== null ? booleanStatus : existingProduct.status,
      stock: intStock !== null ? intStock : existingProduct.stock,
      categoryId: categoryId || existingProduct.categoryId,
      image: imagePath,
    };
    const updatedProduct = ProductModel.updateProduct(id, product);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const existingProduct = await this.getProductById(id);
    if (existingProduct.image) {
      deleteImageByFilename(existingProduct.image);
    }
    const deletedProduct = await ProductModel.deleteProduct(id);
    return deletedProduct;
  }
}

export default new ProductService();
