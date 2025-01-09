const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", wishlistController.getAllWishlist);
router.get("/:id", wishlistController.getWishlistById);
router.post("/", authMiddleware,roleMiddleware ("admin") ,wishlistController.createWishlist);
router.put("/:id",authMiddleware,roleMiddleware ("admin") , wishlistController.updateWishlist);
router.delete("/:id", authMiddleware,roleMiddleware ("admin") ,wishlistController.deleteWishlist);

module.exports = router;
