import multer from "multer";
import path from "path";

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/users");
  },
  filename: (req, file, cb) => {
    cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
  }
});

export const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/categories");
  },
  filename: (req, file, cb) => {
    cb(null, `category-${Date.now()}${path.extname(file.originalname)}`);
  }
});

export const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, `product-${Date.now()}${path.extname(file.originalname)}`);
  }
});

export const imageFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

export const uploadUser = multer({ storage: userStorage, fileFilter: imageFilter });
export const uploadCategoryImage = multer({ storage: categoryStorage, fileFilter: imageFilter });
export const uploadProductImage = multer({ storage: productStorage, fileFilter: imageFilter });
