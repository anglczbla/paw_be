var express = require("express");
var router = express.Router();

const produkController = require("../controllers/produkController");

// Menampilkan profil pengguna
router.get("/", produkController.index);

// Menyimpan data profil baru
router.post("/store", produkController.store);

// Memperbarui data profil
router.post("/update", produkController.update);

// Menghapus data profil
router.get("/delete/:id", produkController.deleteProduk);

module.exports = router;
