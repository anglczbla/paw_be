// Mengimpor modul mongoose untuk mengelola koneksi dengan MongoDB
const mongoose = require("mongoose");

// Mendefinisikan schema untuk produk
const produkSchema = new mongoose.Schema({
    // Field untuk nama produk
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    // Field untuk deskripsi produk
    deskripsi: {
        type: String,
        required: true,
        trim: true,
    },
    // Field untuk harga produk
    harga: {
        type: Number,
        required: true,
        min: 0,
    },
    // Field untuk kategori produk
    kategori: {
        type: String,
        required: true,
        trim: true,
    },
    // Field untuk menyimpan tanggal pembuatan data produk
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Membuat model Produk dari schema yang telah didefinisikan
const Produk = mongoose.model("Produk", produkSchema);

// Ekspor modul Produk
module.exports = Produk;
