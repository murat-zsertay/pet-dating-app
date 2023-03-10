
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
  folder: 'pet-dating-uploads',
  format: async (req, file) => {
    const allowedFormats = ['png', 'jpg', 'jpeg'];
    const fileFormat = file.originalname.split('.').pop();
    return allowedFormats.includes(fileFormat) ? fileFormat : allowedFormats[0];
  }, // or any other format you like
  public_id: (req, file) => (Date.now() + "-" + file.originalname)
  }
  });
const upload = multer({ storage: storage });

export default upload
