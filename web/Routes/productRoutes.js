// @ts-check
import express from "express";
import {
  getProductsCount,
  createProducts,
  getProductsList,
} from "../Controllers/productController.js";

const router = express.Router();

/**
 * GET /api/products/count - Get total products count
 */
router.get("/count", getProductsCount);

/**
 * POST /api/products - Create demo products
 */
router.post("/", createProducts);

/**
 * GET /api/products/list - Get list of all products with variants
 */
router.get("/list", getProductsList);

export default router;
