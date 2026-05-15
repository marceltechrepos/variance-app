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

// =========================================================

/**
 * Get dashboard stats
 * @param {any} _req
 * @param {any} res
 */
export async function getDashboardStats(_req, res) {
  try {
    const shop = res.locals?.shopify?.session?.shop;
    if (!shop) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 1. Total Products (from Shopify)
    const client = new (await import("../shopify.js")).default.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const countData = await client.request(`
      query shopifyProductCount {
        productsCount {
          count
        }
      }
    `);
    const totalProducts = countData.data.productsCount.count;

    // 2. Products with Variants (from Shopify)
    const variantData = await client.request(`
      query ProductsWithVariants {
        products(first: 250) {
          nodes {
            id
            variantsCount: variantsCount {
              count
            }
          }
        }
      }
    `);
    const productsWithVariants = variantData.data.products.nodes.filter(
      p => p.variantsCount.count > 1
    ).length;

    // 3. Products with Custom Options (from your database)
    const productsWithCustomOptions = await ProductVirtualOption.countDocuments({ shop });

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        productsWithVariants,
        productsWithCustomOptions
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: error.message });
  }
}


/**
 * Get recently saved products (products with virtual options)
 * @param {any} _req
 * @param {any} res
 */
export async function getRecentlySavedProducts(_req, res) {
  try {
    const shop = res.locals?.shopify?.session?.shop;
    if (!shop) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get all products that have virtual options saved
    const savedProducts = await ProductVirtualOption.find({ shop })
      .sort({ updatedAt: -1 }) // latest first
      .limit(10); // last 10 products

    if (!savedProducts.length) {
      return res.json({ products: [], success: true });
    }

    // Fetch product details from Shopify for these productIds
    const productIds = savedProducts.map(p => p.productId);

    const client = new (await import("../shopify.js")).default.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    // Fetch product details in batches (Shopify API limit)
    const products = [];
    for (const productId of productIds) {
      try {
        const query = `
          query GetProduct($id: ID!) {
            product(id: $id) {
              id
              title
              handle
              featuredImage {
                url
              }
            }
          }
        `;
        const result = await client.request(query, {
          variables: { id: `gid://shopify/Product/${productId}` }
        });
        if (result.data.product) {
          products.push({
            id: productId,
            title: result.data.product.title,
            handle: result.data.product.handle,
            featuredImage: result.data.product.featuredImage?.url,
            updatedAt: savedProducts.find(p => p.productId === productId)?.updatedAt
          });
        }
      } catch (err) {
        console.error(`Failed to fetch product ${productId}:`, err);
      }
    }

    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching recently saved products:", error);
    res.status(500).json({ error: error.message });
  }
}

// ===================================================

/**
 * Get single product details by ID
 */
export async function getProductById(req, res) {
  try {
    const { productId } = req.params;
    const client = new (await import("../shopify.js")).default.api.clients.Graphql({
      session: res.locals.shopify.session,
    });
    const query = `
            query GetProduct($id: ID!) {
                product(id: $id) {
                    title
                    handle
                }
            }
        `;
    const result = await client.request(query, {
      variables: { id: `gid://shopify/Product/${productId}` }
    });
    if (result.data.product) {
      res.json({
        success: true,
        title: result.data.product.title,
        handle: result.data.product.handle
      });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ------------------------------

/**
 * DELETE /api/virtual-options/product/:productId
 * Delete all virtual options for a product
 */
export const deleteProductOptions = async (req, res) => {
  try {
    const { productId } = req.params;
    const shop = res.locals?.shopify?.session?.shop;
    if (!shop) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const result = await ProductVirtualOption.findOneAndDelete({ productId, shop });
    if (!result) {
      return res.status(404).json({ success: false, error: 'No options found for this product' });
    }
    res.json({ success: true, message: 'Product options deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// -----------------------------------------

export async function getShopDomain(req, res) {
    try {
        const shop = res.locals?.shopify?.session?.shop;
        if (!shop) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        res.json({ success: true, domain: shop });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}