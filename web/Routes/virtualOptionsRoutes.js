import express from "express";
import {
  getVirtualOptions,
  saveVirtualOptions,
  deleteVirtualOption,
  updateVirtualOption,
} from "../Controllers/virtualOptionsController.js";

const virtualOptionsRoutes = express.Router();


virtualOptionsRoutes.get("/virtual-options/:productId", getVirtualOptions);

virtualOptionsRoutes.post("/virtual-options/:productId", saveVirtualOptions);

virtualOptionsRoutes.delete("/virtual-options/:productId/:optionId", deleteVirtualOption);

virtualOptionsRoutes.put("/virtual-options/:productId/:optionId", updateVirtualOption);

export default virtualOptionsRoutes;