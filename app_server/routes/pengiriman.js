var express = require("express");
var router = express.Router();

const pengirimanController = require("../controllers/pengirimanController");

// Menampilkan profil pengguna
router.get("/", pengirimanController.index);

// Menyimpan data profil baru
router.post("/store", pengirimanController.store);

// Memperbarui data profil
router.post("/update", pengirimanController.update);

// Menghapus data profil
router.get("/delete/:id", pengirimanController.deletePengiriman);

module.exports = router;
