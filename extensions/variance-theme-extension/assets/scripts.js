function extractProductId(value) {
    if (!value) return null;
    if (typeof value === 'number') return String(value);
    if (typeof value !== 'string') return null;

    const trimmed = value.trim();
    if (!trimmed) return null;

    const gidMatch = trimmed.match(/\/([^\/]+)$/);
    if (gidMatch && /^\d+$/.test(gidMatch[1])) {
        return gidMatch[1];
    }

    return /^\d+$/.test(trimmed) ? trimmed : null;
}

function getProductIdFromPage() {
    const productElement = document.querySelector('[data-product-id]');
    let productId = productElement ? extractProductId(productElement.dataset.productId) : null;

    if (!productId) {
        const hiddenInput = document.querySelector('input[name="product_id"]');
        productId = hiddenInput ? extractProductId(hiddenInput.value) : null;
    }

    if (!productId && window.meta && window.meta.product && window.meta.product.id) {
        productId = extractProductId(window.meta.product.id);
    }

    if (!productId && window.ShopifyAnalytics && window.ShopifyAnalytics.meta && window.ShopifyAnalytics.meta.page && window.ShopifyAnalytics.meta.page.resourceId) {
        productId = extractProductId(window.ShopifyAnalytics.meta.page.resourceId);
    }

    if (!productId && window.product && window.product.id) {
        productId = extractProductId(window.product.id);
    }

    return productId;
}

async function hitGetApi() {
    const productId = getProductIdFromPage();
    if (!productId) {
        console.debug('Product ID not found on this page; skipping variant options fetch.');
        return null;
    }

    try {
        console.log(`📦 Fetching options for product ID: ${productId}`);

        const response = await fetch(`/apps/variant-tool/productvirtualoptions?productId=${encodeURIComponent(productId)}`);

        if (!response.ok) {
            console.debug(`No variant options API result for product ${productId}: status ${response.status}`);
            return null;
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (!data || data.success !== true || !Array.isArray(data.data)) {
            return null;
        }

        return data.data;

    } catch (error) {
        console.error('Error fetching API:', error);
        return null;
    }
}

function initializeVariantOptions() {
    var container = document.getElementById('variance-product-options');
    if (!container) return;

    var productId = getProductIdFromPage();
    if (!productId) {
        console.debug('Product ID not found on this page; skipping variant options render.');
        return;
    }

    hitGetApi().then(function(options) {
        if (!options || !Array.isArray(options) || options.length === 0) {
            return;
        }

        if (typeof window.renderVariantOptions === 'function') {
            window.renderVariantOptions(options);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVariantOptions);
} else {
    initializeVariantOptions();
}