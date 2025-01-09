var express = require("express");
var router = express.Router();

const testimoniController = require("../controllers/testimoniController");

// Menampilkan profil pengguna
router.get("/", testimoniController.index);

// Menyimpan data profil baru
router.post("/store", testimoniController.store);

// Memperbarui data profil
router.post("/update", testimoniController.update);

// Menghapus data profil
router.get("/delete/:id", testimoniController.deleteTestimoni);

module.exports = router;
