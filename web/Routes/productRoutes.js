// @ts-check
import express from "express";
import {
  getProductsCount,
  createProducts,
  getProductsList,
} from "../Controllers/productController.js";

const ProductRoute = express.Router();

/**
 * GET /api/products/count - Get total products count
 */
ProductRoute.get("/products/count", getProductsCount);

/**
 * POST /api/products - Create demo products
 */
ProductRoute.post("/products", createProducts);

/**
 * GET /api/products/list - Get list of all products with variants
 */
ProductRoute.get("/products/list", getProductsList);

export default ProductRoute;
