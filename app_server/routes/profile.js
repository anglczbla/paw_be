var express = require("express");
var router = express.Router();

const profileController = require("../controllers/profileController");

// Menampilkan profil pengguna
router.get("/", profileController.index);

// Menyimpan data profil baru
router.post("/store", profileController.store);

// Memperbarui data profil
router.post("/update", profileController.update);

// Menghapus data profil
router.get("/delete/:id", profileController.delete);

module.exports = router;
