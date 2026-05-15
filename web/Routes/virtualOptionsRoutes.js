import express from "express";
import {
  getVirtualOptions,
  saveVirtualOptions,
  deleteVirtualOption,
  updateVirtualOption,
  getDashboardStats,
  getRecentlySavedProducts,
  getProductById,
  deleteProductOptions,
  getShopDomain,
} from "../Controllers/virtualOptionsController.js";

const virtualOptionsRoutes = express.Router();


virtualOptionsRoutes.get("/virtual-options/:productId", getVirtualOptions);

virtualOptionsRoutes.post("/virtual-options/:productId", saveVirtualOptions);

virtualOptionsRoutes.delete("/virtual-options/:productId/:optionId", deleteVirtualOption);

virtualOptionsRoutes.put("/virtual-options/:productId/:optionId", updateVirtualOption);
// 👈 Add this route
virtualOptionsRoutes.get("/dashboard/stats", getDashboardStats);

virtualOptionsRoutes.get("/recently-saved", getRecentlySavedProducts);
virtualOptionsRoutes.get("/products/:productId", getProductById);
virtualOptionsRoutes.delete("/product/:productId", deleteProductOptions);

virtualOptionsRoutes.get("/shop/domain", getShopDomain);



export default virtualOptionsRoutes;