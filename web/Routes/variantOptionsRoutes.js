import { Router } from 'express';
const variantOptionsRouter = Router();

variantOptionsRouter.get('/testing', (req, res) => {
    res.status(200).json({message: 'Variant options route is working!'});
});

export default variantOptionsRouter;