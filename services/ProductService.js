import ProductModel from "../models/ProductModel.js";
import OutletModel from "../models/OutletModel.js";
import CategoryModel from "../models/CategoryModel.js";
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
    const existingOutlet = await OutletModel.getOutletById(outletId);
    if (!existingOutlet) {
      throw new Error("Outlet not found");
    }
    const existingCategory = await CategoryModel.getCategoryById(categoryId);
    if (!existingCategory) {
      throw new Error("Category not found");
    }
    const product = {
      name,
      description,
      price,
      status,
      stock,
      categoryId,
      outletId,
      image,
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
    const existingOutlet = await OutletModel.getOutletById(outletId);
    if (!existingOutlet) {
      throw new Error("Outlet not found");
    }
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
    const existingProduct = await ProductModel.getProductById(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    const floatPrice = price ? parseFloat(price) : existingProduct.price;
    if (price && (isNaN(floatPrice) || floatPrice <= 0)) {
      throw new Error("Price must be a positive number");
    }
    const intStock = stock ? parseInt(stock, 10) : existingProduct.stock;
    if (stock && intStock < 0) {
      throw new Error("Stock must be a non-negative integer");
    }
    const booleanStatus = status === "true" ? true : false;
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
    const existingProduct = await ProductModel.getProductById(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    if (existingProduct.image) {
      deleteImageByFilename(existingProduct.image);
    }
    const deletedProduct = await ProductModel.deleteProduct(id);
    return deletedProduct;
  }
}

export default new ProductService();
