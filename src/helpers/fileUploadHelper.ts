import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'dzh5astb3',
  api_key: '218542495115891',
  api_secret: 'j0Am_WAkVkmpDmuFp4snCbgWGqk',
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error: any, result: any) => {
      if (error) {
        fs.unlinkSync(file.path);
        reject(error);
      } else {
        fs.unlinkSync(file.path); // Remove the file from the local storage
        resolve(result);
      }
    });
  });
};

export const fileUploadHelper = {
  uploadToCloudinary,
  upload,
};
