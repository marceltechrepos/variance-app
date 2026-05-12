import ProductVirtualOption from "../Models/ProductVirtualOption.js";

/**
 * GET /api/virtual-options/:productId
 * Fetch virtual options for a specific product
 */
export const getVirtualOptions = async (req, res) => {
  try {
    const { productId } = req.params;
    const shop = res.locals?.shopify?.session?.shop;
    if (!shop) {
      return res.status(401).json({ error: "Unauthorized: No shop session" });
    }// from auth middleware

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const record = await ProductVirtualOption.findOne({ productId, shop });

    if (!record) {
      return res.json({ options: [], success: true });
    }

    res.json({ options: record.options, success: true });
  } catch (error) {
    console.error("Error fetching virtual options:", error);
    res.status(500).json({ error: "Failed to fetch options" });
  }
};

/**
 * POST /api/virtual-options/:productId
 * Save virtual options for a specific product
 */
export const saveVirtualOptions = async (req, res) => {
  try {
    const { productId } = req.params;
    const shop = res.locals?.shopify?.session?.shop;
    if (!shop) {
      return res.status(401).json({ error: "Unauthorized: No shop session" });
    } // from auth middleware
    const { options } = req.body;


    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    if (!options || !Array.isArray(options)) {
      return res.status(400).json({ error: "Options must be an array" });
    }

    const updated = await ProductVirtualOption.findOneAndUpdate(
      { productId, shop },
      { productId, shop, options },
      { upsert: true, returnDocument: 'after' }
      // { upsert: true, new: true }
    );

    res.json({
      success: true,
      options: updated.options,
      message: "Options saved successfully"
    });
  } catch (error) {
    console.error("Error saving virtual options:", error);
    res.status(500).json({ error: "Failed to save options" });
  }
};

/**
 * DELETE /api/virtual-options/:productId/:optionId
 * Delete a specific virtual option
 */
export const deleteVirtualOption = async (req, res) => {
  try {
    const { productId, optionId } = req.params;
    const shop = res.locals?.shopify?.session?.shop;
    if (!shop) {
      return res.status(401).json({ error: "Unauthorized: No shop session" });
    }

    const record = await ProductVirtualOption.findOne({ productId, shop });

    if (!record) {
      return res.status(404).json({ error: "No options found for this product" });
    }

    record.options = record.options.filter(opt => opt.id !== optionId);
    await record.save();

    res.json({
      success: true,
      options: record.options,
      message: "Option deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting virtual option:", error);
    res.status(500).json({ error: "Failed to delete option" });
  }
};

/**
 * PUT /api/virtual-options/:productId/:optionId
 * Update a specific virtual option
 */
export const updateVirtualOption = async (req, res) => {
  try {
    const { productId, optionId } = req.params;
    const shop = res.locals?.shopify?.session?.shop;
    if (!shop) {
      return res.status(401).json({ error: "Unauthorized: No shop session" });
    }
    const { option } = req.body;

    const record = await ProductVirtualOption.findOne({ productId, shop });

    if (!record) {
      return res.status(404).json({ error: "No options found for this product" });
    }

    const index = record.options.findIndex(opt => opt.id === optionId);
    if (index === -1) {
      return res.status(404).json({ error: "Option not found" });
    }

    record.options[index] = { ...option, id: optionId };
    await record.save();

    res.json({
      success: true,
      options: record.options,
      message: "Option updated successfully"
    });
  } catch (error) {
    console.error("Error updating virtual option:", error);
    res.status(500).json({ error: "Failed to update option" });
  }
};