import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

    if (!allowed.includes(file.mimetype)) {
      cb(new Error("Unsupported file type"));
    } else {
      cb(null, true);
    }
  },
});
