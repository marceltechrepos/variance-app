// @ts-check
import productCreator from "../product-creator.js";

/**
 * Get products count from Shopify
 * @param {any} _req
 * @param {any} res
 */
export async function getProductsCount(_req, res) {
  try {
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

    res.status(200).send({ count: countData.data.productsCount.count });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.log(`Failed to fetch products count: ${message}`);
    res.status(500).send({ error: message });
  }
}

/**
 * Create new products
 * @param {any} _req
 * @param {any} res
 */
export async function createProducts(_req, res) {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.log(`Failed to process products/create: ${message}`);
    status = 500;
    error = message;
  }
  res.status(status).send({ success: status === 200, error });
}

/**
 * Get list of all products with basic info
 * @param {any} _req
 * @param {any} res
 */
export async function getProductsList(_req, res) {
  try {
    const shopifyModule = await import("../shopify.js");
    const shopify = shopifyModule.default;

    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const query = `
      query ProductsList {
        products(first: 250) {
          nodes {
            id
            title
            featuredImage {
              url
            }
          }
        }
      }
    `;

    const result = await client.request(query);
    const products = result.data.products.nodes || [];

    res.status(200).send({ products });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.log(`Failed to fetch products/list: ${message}`);
    res.status(500).send({ error: message });
  }
}

