const express = require("express");
const router = express.Router();
const testimoniController = require("../controllers/testimoniController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Route untuk mendapatkan semua testimoni
router.get("/", testimoniController.getAllTestimoni);

// Route untuk mendapatkan testimoni berdasarkan ID
router.get("/:id", testimoniController.getTestimoniById);

// Route untuk membuat testimoni baru
router.post("/",authMiddleware,roleMiddleware ("admin") , testimoniController.createTestimoni);

// Route untuk memperbarui testimoni berdasarkan ID
router.put("/:id",authMiddleware,roleMiddleware ("admin") , testimoniController.updateTestimoni);

// Route untuk menghapus testimoni berdasarkan ID
router.delete("/:id", authMiddleware,roleMiddleware ("admin") ,testimoniController.deleteTestimoni);

module.exports = router;
