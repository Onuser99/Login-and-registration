const express = require("express")
const router = express.Router();
const getAllUsers = require("../controllers/admin-controller")
const getPropertyDetails = require("../controllers/property-controller")
const { uploadImage, upload } = require("../controllers/image-controller")

router.route('/users').get(getAllUsers);
router.route('/property').get(getPropertyDetails);
router.route("/upload").get(uploadImage)
// router.route("/upload").post(uploadImage);
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;