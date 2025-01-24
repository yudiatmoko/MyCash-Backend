import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        statusCode: 400,
        message: "Missing required parameter - file",
      });
    }
    next();
  });
};

export default handleFileUpload;
