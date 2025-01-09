const express = require("express");
const router = express.Router();
const pengirimanController = require("../controllers/pengirimanController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Route untuk mendapatkan semua data pengiriman
router.get("/", pengirimanController.getAllPengiriman);

// Route untuk mendapatkan data pengiriman berdasarkan ID
router.get("/:id", pengirimanController.getPengirimanById);

// Route untuk membuat data pengiriman baru
router.post("/", authMiddleware,roleMiddleware ("admin") ,pengirimanController.createPengiriman);

// Route untuk memperbarui data pengiriman berdasarkan ID
router.put("/:id",authMiddleware,roleMiddleware ("admin") , pengirimanController.updatePengiriman);

// Route untuk menghapus data pengiriman berdasarkan ID
router.delete("/:id",authMiddleware,roleMiddleware ("admin") , pengirimanController.deletePengiriman);

module.exports = router;
