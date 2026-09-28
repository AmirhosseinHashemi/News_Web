import multer from "multer";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB

const storage = multer.memoryStorage();

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

const upload = multer({
  storage: storage,

  limits: {
    fileSize: MAX_FILE_SIZE,
  },

  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error("Only JPEG, PNG and WebP images are allowed"));
      return;
    }

    cb(null, true);
  },
});

export default upload;
