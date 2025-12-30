import fs from "fs";
import path from "path";
import multer from "multer";

const uploadDir = path.join(process.cwd(), "uploads");

// Ensure folder exists at server start
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Safety: recreate folder if deleted during runtime
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },

  filename: (_, file, cb) => {
    // Sanitize filename to avoid path traversal / special chars
    const sanitized = file.originalname.replace(/[^a-z0-9.-]/gi, "_");
    cb(null, `${Date.now()}-${sanitized}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },

  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Only PDF, DOCX, and TXT files are allowed"
        ),
        false
      );
    }
  },
});
