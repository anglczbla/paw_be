const express = require("express");

const router = express.Router();

const produkController = require("../controllers/produkControllers");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk fakultas
// Mengatur rute GET untuk mendapatkan semua data fakultas
router.get("/", produkController.getAllProduk);
// Mengatur rute POST untuk membuat data fakultas baru
router.post("/", authMiddleware,roleMiddleware ("admin") ,produkController.createProduk);
// Mengatur rute GET untuk mendapatkan data fakultas berdasarkan ID
router.get("/:id", produkController.getProdukById);
// Mengatur rute PUT untuk memperbarui data fakultas berdasarkan ID
router.put("/:id", authMiddleware,roleMiddleware ("admin") ,produkController.updateProduk);
// Mengatur rute DELETE untuk menghapus data fakultas berdasarkan ID
router.delete("/:id", authMiddleware,roleMiddleware ("admin") ,produkController.deleteProduk);



module.exports = router;