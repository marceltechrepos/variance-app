import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: "dwfxrtjhc",
  api_key: "179911644852471",
  api_secret: "M4-UybGEakyVsz2yg5GkTtqpij4",
});

export const uploadImage = async (req, res) => {
  try {
    const file = req.files?.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'virtual-options',
    });

    fs.unlinkSync(file.tempFilePath); // cleanup temp

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
};