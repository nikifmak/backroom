const express = require("express");
const router = express.Router();

const multer = require("multer");
const AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const folder = "item_images";

// @route   POST api/v1/upload/
// @desc    Uploads a image to s3 bucket
// @access  Public
router.post("/", upload.single("file"), (req, res) => {
  const file = req.file;

  const extension = file.originalname.split(".")[1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: folder + "/" + new Date().valueOf() + "." + extension,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ success: false, message: err });
    } else {
      const { Location } = data;
      res.send({ success: true, data: Location });
    }
  });
});

module.exports = router;
