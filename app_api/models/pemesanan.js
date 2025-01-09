// Mengimpor modul mongoose untuk mengelola koneksi dengan MongoDB
const mongoose = require("mongoose");

// Mendefinisikan schema untuk pemesanan
const pemesananSchema = new mongoose.Schema({
    // Field untuk tanggal order
    nama: {
        type: String,
        required: true,
    },
    order: {
        type: Date,
        required: true,
    },
    // Field untuk tanggal selesai
    selesai: {
        type: Date,
        required: true,
    },
    // Field untuk batas order
    batasOrder: {
        type: Number,
        required: true,
        default : 0,
        trim: true,
    },
    
    // Field referensi ke produk yang dipesan
    produk_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produk",
        required: true,
    },
    // Field untuk menyimpan tanggal pembuatan data pemesanan
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Membuat model Pemesanan dari schema yang telah didefinisikan
const Pemesanan = mongoose.model("Pemesanan", pemesananSchema);

// Ekspor modul Pemesanan
module.exports = Pemesanan;
