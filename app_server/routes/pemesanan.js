var express = require("express");
var router = express.Router();

const pemesananController = require("../controllers/pemesananController");

// Rute untuk mendapatkan semua data pemesanan
router.get("/", pemesananController.index);

// Rute untuk menyimpan data pemesanan baru
router.post("/", pemesananController.store);

// Rute untuk memperbarui data pemesanan berdasarkan ID
router.put("/update/:id", pemesananController.update);

// Rute untuk menghapus data pemesanan berdasarkan ID
router.delete("/delete/:id", pemesananController.deletepemesanan);

module.exports = router;
