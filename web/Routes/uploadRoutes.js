import express from 'express';
import { uploadImage } from '../Controllers/uploadController.js';

const uploadImageRoute = express.Router();
uploadImageRoute.post('/upload-image', uploadImage);
export default uploadImageRoute;