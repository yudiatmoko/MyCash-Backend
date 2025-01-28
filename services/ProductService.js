import ProductModel from "../models/ProductModel.js";
import OutletService from "../services/OutletService.js";
import CategoryService from "../services/CategoryService.js";
import {
  uploadBufferToCloudinary,
  destroyImageFromCloudinary,
  extractPublicIdFromUrl,
} from "../config/cloudinary.js";

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

    let imageUrl = null;
    if (image) {
      const result = await uploadBufferToCloudinary(image.buffer, {
        folder: "public",
      });
      imageUrl = result.secure_url;
    } else {
      throw new Error("Image is required");
    }

    const product = {
      name,
      description,
      price: floatPrice,
      status: booleanStatus,
      stock: intStock,
      categoryId,
      outletId,
      image: imageUrl,
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

  async getProductsByCategory(outletId, slug) {
    await OutletService.getOutletById(outletId);
    const products = await ProductModel.getProductsByCategory(outletId, slug);
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
    const booleanStatus =
      status === "true" ? true : status === "false" ? false : null;

    let imageUrl = existingProduct.image;
    if (image) {
      if (existingProduct.image) {
        try {
          const publicId = extractPublicIdFromUrl(existingProduct.image);
          await destroyImageFromCloudinary(publicId);
        } catch (error) {
          console.error(
            "Failed to delete previous image from Cloudinary:",
            error.message
          );
        }
      }
      const result = await uploadBufferToCloudinary(image.buffer, {
        folder: "public",
      });
      imageUrl = result.secure_url;
    }

    const product = {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: floatPrice !== null ? floatPrice : existingProduct.price,
      status: booleanStatus !== null ? booleanStatus : existingProduct.status,
      stock: intStock !== null ? intStock : existingProduct.stock,
      categoryId: categoryId || existingProduct.categoryId,
      image: imageUrl,
    };
    const updatedProduct = ProductModel.updateProduct(id, product);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const existingProduct = await this.getProductById(id);
    if (existingProduct.image) {
      try {
        const publicId = extractPublicIdFromUrl(existingProduct.image);
        await destroyImageFromCloudinary(publicId);
      } catch (error) {
        console.error(
          "Failed to delete previous image from Cloudinary:",
          error.message
        );
      }
    }
    const deletedProduct = await ProductModel.deleteProduct(id);
    return deletedProduct;
  }

  async updateProductStock(id, stock) {
    await this.getProductById(id);
    const intStock = parseInt(stock, 10);
    if (isNaN(intStock) || intStock < 0) {
      throw new Error("Stock must be a non-negative integer");
    }
    const product = {
      stock: intStock,
    };
    const updatedProduct = await ProductModel.updateProduct(id, product);
    return updatedProduct;
  }
}

export default new ProductService();
