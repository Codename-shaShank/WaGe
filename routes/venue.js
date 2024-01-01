const express = require("express");
const {
  requireSignIn,
  dealerMiddleware,
} = require("../common_middlewares/index");
const {
  getAllVenues,
  createVenue,
  getVenueByVenueId,
  getAllVenuesByOwnerId,
  checkAvailability,
} = require("../controllers/venue");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Multer error handler
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    console.error("Multer error:", err);
    return res
      .status(500)
      .json({ msg: "Multer error occurred", error: err.message });
  } else if (err) {
    // An unknown error occurred.
    console.error("Unknown error during file upload:", err);
    return res.status(500).json({
      msg: "Unknown error occurred during file upload",
      error: err.message,
    });
  }
  // If no error occurred, proceed to the next middleware or route handler.
  next();
};

// Use the Multer error handler before other route handlers
router.use(multerErrorHandler);

router.post(
  "/create-venue",
  requireSignIn,
  dealerMiddleware,
  upload.array("venuePicture"),
  createVenue
);
router.get("/venue/:venueId", getVenueByVenueId);
router.get("/venues/:ownerId", getAllVenuesByOwnerId);
router.get("/all-venues", getAllVenues);
router.get("/available", checkAvailability);

module.exports = router;
