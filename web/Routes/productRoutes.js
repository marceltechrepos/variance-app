// @ts-check
import express from "express";
import {
  getProductsCount,
  createProducts,
  getProductsList,
} from "../Controllers/productController.js";

const ProductRoute = express.Router();

ProductRoute.get("/products/count", getProductsCount);

ProductRoute.post("/products", createProducts);

ProductRoute.get("/products/list", getProductsList);

export default ProductRoute;
