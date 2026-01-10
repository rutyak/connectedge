const express = require("express");
const userAuth = require("../middleware/userAuth");
const upload = require("../storage/multer");
const {
  uploadProfile,
  viewProfile,
  editProfile,
} = require("../controller/profileController");
const profileRouter = express.Router();

profileRouter.post(
  "/upload/image",
  userAuth,
  (req, res, next) => {
    upload.single("profileImage")(req, res, (err) => {
      if (err) {
        console.error("Multer/Cloudinary Error:", err);
        return res.status(400).json({
          message: "Image upload failed",
          error: err.message || err,
        });
      }
      next();
    });
  },
  uploadProfile
);

profileRouter.get("/profile/view", userAuth, viewProfile);

profileRouter.patch("/profile/edit", userAuth, editProfile);

module.exports = profileRouter;
