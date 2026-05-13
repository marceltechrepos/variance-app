import { Router } from 'express';
import ProductVirtualOption from '../Models/ProductVirtualOption.js';

const variantOptionsRouter = Router();

function sendEmptyResponse(res) {
    return res.json({
        success: false,
        message: 'No virtual options found for this product',
        data: null
    });
}

variantOptionsRouter.get('/productvirtualoptions/product/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(`Fetching virtual options for product: ${productId}`);

        const productOptions = await ProductVirtualOption.findOne({ productId });
        if (!productOptions || !Array.isArray(productOptions.options) || productOptions.options.length === 0) {
            return sendEmptyResponse(res);
        }

        return res.json({
            success: true,
            message: 'Product virtual options fetched successfully',
            data: productOptions.options
        });

    } catch (error) {
        console.error('Error fetching product options:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product virtual options',
            error: error.message
        });
    }
});

variantOptionsRouter.get('/productvirtualoptions', async (req, res) => {
    try {
        const productId = req.query.productId || req.query.id;
        if (!productId) {
            return sendEmptyResponse(res);
        }

        const productOptions = await ProductVirtualOption.findOne({ productId });
        if (!productOptions || !Array.isArray(productOptions.options) || productOptions.options.length === 0) {
            return sendEmptyResponse(res);
        }

        return res.json({
            success: true,
            message: 'Product virtual options fetched successfully',
            data: productOptions.options
        });
    } catch (error) {
        console.error('Error fetching product options:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching product virtual options',
            error: error.message,
            data: null
        });
    }
});

export default variantOptionsRouter;