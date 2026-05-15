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

// Get selected variant ID (if product has variants)
function getSelectedVariantId() {
    var variantSelect = document.querySelector('select[name="id"], [name="id"]');
    if (variantSelect && variantSelect.value) {
        return variantSelect.value;
    }
    var variantRadio = document.querySelector('input[name="id"]:checked');
    if (variantRadio && variantRadio.value) {
        return variantRadio.value;
    }
    // Default variant from Shopify data
    if (window.product && window.product.selectedVariantId) {
        return window.product.selectedVariantId;
    }
    return null;
}

// Collect all selected options from our app
function collectSelectedOptions() {
    var optionsData = {};
    var optionWrappers = document.querySelectorAll('#variance-product-options .option-wrapper');

    optionWrappers.forEach(function (wrapper) {
        var optionId = wrapper.getAttribute('data-option-id');
        var optionTitle = wrapper.querySelector('.option-title')?.innerText?.replace('*', '').trim() || optionId;
        var hiddenInput = wrapper.querySelector('.option-value-input');
        var selectedValue = hiddenInput ? hiddenInput.value : '';

        // Parse JSON if multiselect
        try {
            if (selectedValue && selectedValue.startsWith('[')) {
                selectedValue = JSON.parse(selectedValue);
            }
        } catch (e) { }

        optionsData[optionId] = {
            title: optionTitle,
            value: selectedValue,
            type: wrapper.getAttribute('data-option-type')
        };
    });

    return optionsData;
}

// Add to Cart with custom attributes
async function addToCartWithOptions(productId, variantId, quantity, selectedOptions) {
    // Prepare line item with properties (custom options)
    var properties = {};
    for (var key in selectedOptions) {
        var opt = selectedOptions[key];
        var value = opt.value;

        // Convert array to comma separated string for display
        if (Array.isArray(value)) {
            value = value.join(', ');
        }

        if (value && value !== '[]' && value !== '') {
            properties[opt.title] = value;
        }
    }

    var item = {
        id: variantId || productId,
        quantity: quantity,
        properties: properties
    };

    try {
        const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ items: [item] })
        });

        const data = await response.json();

        if (response.ok) {
            showCartNotification('Product added to cart!', 'success');
            updateCartCount();

            // ✅ FIX: Use window.location.replace for immediate redirect
            window.location.replace('/cart');
            return data;
        } else {
            throw new Error(data.description || 'Failed to add to cart');
        }
    } catch (error) {
        console.error('Add to cart error:', error);
        showCartNotification(error.message, 'error');
        return null;
    }
}

// Show notification
function showCartNotification(message, type) {
    var notification = document.createElement('div');
    notification.className = 'variance-cart-notification variance-cart-notification--' + type;
    notification.innerHTML = message;
    notification.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:9999; padding:12px 20px; border-radius:8px; font-size:14px; font-weight:500; transition:0.3s; ' +
        (type === 'success' ? 'background:#00a060; color:white;' : 'background:#d72c0d; color:white;');
    document.body.appendChild(notification);
    setTimeout(function () {
        notification.style.opacity = '0';
        setTimeout(function () { notification.remove(); }, 300);
    }, 3000);
}

// Update cart count in header
function updateCartCount() {
    fetch('/cart.js')
        .then(function (res) { return res.json(); })
        .then(function (cart) {
            var cartCountElements = document.querySelectorAll('.cart-count, .site-header__cart-count, .cart-count-bubble');
            cartCountElements.forEach(function (el) {
                el.textContent = cart.item_count;
            });
        })
        .catch(function (err) { console.error('Failed to update cart count:', err); });
}

// Find and override the existing Add to Cart button
function overrideAddToCartButton() {
    setTimeout(function () {
        var addToCartBtn = document.querySelector('form[action="/cart/add"] button[type="submit"], form[action="/cart/add"] input[type="submit"], .product-form__submit, button[name="add"], #AddToCart');

        if (!addToCartBtn) {
            setTimeout(overrideAddToCartButton, 500);
            return;
        }

        var originalButtonText = addToCartBtn.innerHTML;
        var newBtn = addToCartBtn.cloneNode(true);
        addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);

        var parentForm = newBtn.closest('form');
        if (parentForm && parentForm.getAttribute('action') === '/cart/add') {
            parentForm.addEventListener('submit', function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }

        newBtn.addEventListener('click', async function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Clear all previous errors first
            document.querySelectorAll('.option-error').forEach(function (err) {
                err.style.display = 'none';
                err.closest('.option-wrapper')?.classList.remove('has-error');
            });

            // Validate step by step - find first invalid option
            var firstInvalidWrapper = null;
            var errorMessage = '';

            var optionWrappers = document.querySelectorAll('#variance-product-options .option-wrapper');

            for (var i = 0; i < optionWrappers.length; i++) {
                var wrapper = optionWrappers[i];
                var isRequired = wrapper.getAttribute('data-required') === 'true';
                var optionTitle = wrapper.querySelector('.option-title')?.innerText?.replace('*', '').trim() || 'This option';
                var hiddenInput = wrapper.querySelector('.option-value-input');
                var selectedValue = hiddenInput ? hiddenInput.value : '';
                var multiselectRule = wrapper.getAttribute('data-rule');
                var multiselectValue = parseInt(wrapper.getAttribute('data-rule-value')) || 0;

                var isValid = true;
                var specificError = '';

                // Check if empty
                if (isRequired && (!selectedValue || selectedValue === '' || selectedValue === '[]')) {
                    isValid = false;
                    specificError = optionTitle + ' is required';
                }

                // Check multiselect rule if applicable
                if (isValid && multiselectRule && multiselectRule !== 'no_restriction') {
                    var parsedValue = [];
                    try {
                        if (selectedValue && selectedValue.startsWith('[')) {
                            parsedValue = JSON.parse(selectedValue);
                        }
                    } catch (e) { }

                    var count = parsedValue.length;
                    if (multiselectRule === 'at_least' && count < multiselectValue) {
                        isValid = false;
                        specificError = 'Please select at least ' + multiselectValue + ' option(s) for ' + optionTitle;
                    } else if (multiselectRule === 'at_most' && count > multiselectValue) {
                        isValid = false;
                        specificError = 'Please select at most ' + multiselectValue + ' option(s) for ' + optionTitle;
                    } else if (multiselectRule === 'exactly' && count !== multiselectValue) {
                        isValid = false;
                        specificError = 'Please select exactly ' + multiselectValue + ' option(s) for ' + optionTitle;
                    }
                }

                if (!isValid) {
                    firstInvalidWrapper = wrapper;
                    errorMessage = specificError;
                    break;
                }
            }

            if (firstInvalidWrapper) {
                // Show error only for the first invalid field
                var errDiv = firstInvalidWrapper.querySelector('.option-error');
                if (!errDiv) {
                    errDiv = document.createElement('div');
                    errDiv.className = 'option-error';
                    firstInvalidWrapper.appendChild(errDiv);
                }
                errDiv.textContent = errorMessage;
                errDiv.style.display = 'block';
                firstInvalidWrapper.classList.add('has-error');

                // Scroll to the error
                firstInvalidWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Show notification as well
                showCartNotification(errorMessage, 'error');
                return;
            }

            // Get product and variant info
            var productId = getProductIdFromPage();
            var variantId = getSelectedVariantId();
            var quantity = 1;

            var quantityInput = document.querySelector('input[name="quantity"], .quantity__input');
            if (quantityInput && quantityInput.value) {
                quantity = parseInt(quantityInput.value, 10);
            }

            var selectedOptions = collectSelectedOptions();

            newBtn.disabled = true;
            newBtn.innerHTML = 'Adding...';

            await addToCartWithOptions(productId, variantId, quantity, selectedOptions);

            newBtn.disabled = false;
            newBtn.innerHTML = originalButtonText;
        });

    }, 500);
}

async function hitGetApi() {
    const productId = getProductIdFromPage();
    if (!productId) {
        console.debug('Product ID not found');
        return null;
    }
    try {
        const response = await fetch(`/apps/variant-tool/productvirtualoptions?productId=${encodeURIComponent(productId)}`);
        if (!response.ok) return null;
        const data = await response.json();
        if (!data || data.success !== true || !Array.isArray(data.data)) return null;
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
    if (!productId) return;
    hitGetApi().then(function (options) {
        if (!options || options.length === 0) return;
        if (typeof window.renderVariantOptions === 'function') {
            window.renderVariantOptions(options, productId);
            // After rendering options, override the add to cart button
            overrideAddToCartButton();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVariantOptions);
} else {
    initializeVariantOptions();
}