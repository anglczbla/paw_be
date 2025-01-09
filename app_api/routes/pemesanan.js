const express = require("express");
const router = express.Router();
const pemesananController = require("../controllers/pemesananController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Route untuk mendapatkan semua data pemesanan
router.get("/", pemesananController.getAllPemesanan);

// Route untuk membuat data pemesanan baru
router.post("/",authMiddleware,roleMiddleware ("admin") ,pemesananController.createPemesanan);

// Route untuk mendapatkan data pemesanan berdasarkan ID
router.get("/:id", pemesananController.getPemesananById);

// Route untuk memperbarui data pemesanan berdasarkan ID
router.put("/:id",authMiddleware,roleMiddleware ("admin") , pemesananController.updatePemesanan);

// Route untuk menghapus data pemesanan berdasarkan ID
router.delete("/:id",authMiddleware,roleMiddleware ("admin") , pemesananController.deletePemesanan);

module.exports = router;
