const Wishlist = require("../models/wishlist");
const Produk = require("../models/produk");
const express = require("express");
const router = express.Router();

// Mengambil semua data wishlist
const getAllWishlist = async (req, res) => {
    try {
        console.log("Mengambil semua data wishlist...");
        const wishlist = await Wishlist.find().populate("produk_id", "nama merek kadaluarsa jenis harga");
        console.log("Data wishlist berhasil diambil:", wishlist);
        res.status(200).json(wishlist);
    } catch (err) {
        console.error("Terjadi kesalahan saat mengambil data wishlist:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Mengambil data wishlist berdasarkan ID
const getWishlistById = async (req, res) => {
    try {
        console.log("Mencari wishlist dengan ID:", req.params.id);
        const wishlist = await Wishlist.findById(req.params.id).populate("produk_id", "nama merek kadaluarsa jenis harga");
        if (!wishlist) {
            console.warn("Wishlist tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Wishlist not found" });
        }
        console.log("Data wishlist ditemukan:", wishlist);
        res.status(200).json(wishlist);
    } catch (err) {
        console.error("Terjadi kesalahan saat mencari wishlist:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Membuat data wishlist baru
const createWishlist = async (req, res) => {
    console.log("Menerima data untuk membuat wishlist:", req.body);

    // Validasi sederhana
    if (!req.body.produk_id || !req.body.status) {
        console.warn("Data wishlist tidak valid:", req.body);
        return res.status(400).json({ message: "produk_id dan status harus diisi." });
    }

    const wishlist = new Wishlist({
        nama: req.body.nama,
        produk_id: req.body.produk_id,
        tanggal: req.body.tanggal || Date.now(),
        status: req.body.status, // "Ingin Dibeli" atau "Sudah Dibeli"
    });

    try {
        const newWishlist = await wishlist.save();
        console.log("Data wishlist baru berhasil dibuat:", newWishlist);
        res.status(201).json(newWishlist);
    } catch (err) {
        console.error("Terjadi kesalahan saat membuat wishlist:", err.message);
        res.status(400).json({ message: err.message });
    }
};

// Memperbarui data wishlist berdasarkan ID
const updateWishlist = async (req, res) => {
    console.log("Menerima data untuk memperbarui wishlist:", req.body);

    const { status, produk_id, nama, tanggal } = req.body;

    try {
        console.log("Mencari wishlist dengan ID:", req.params.id);
        const wishlist = await Wishlist.findById(req.params.id);
        if (!wishlist) {
            console.warn("Wishlist tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Wishlist not found" });
        }

        // Perbarui field wishlist
        wishlist.status = status ?? wishlist.status;
        wishlist.produk_id = produk_id ?? wishlist.produk_id;
        wishlist.nama = nama ?? wishlist.nama;
        wishlist.tanggal = tanggal ?? wishlist.tanggal;

        const updatedWishlist = await wishlist.save();
        console.log("Data wishlist berhasil diperbarui:", updatedWishlist);
        res.json(updatedWishlist);
    } catch (error) {
        console.error("Terjadi kesalahan saat memperbarui wishlist:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Menghapus data wishlist berdasarkan ID
const deleteWishlist = async (req, res) => {
    try {
        console.log("Mencari wishlist untuk dihapus dengan ID:", req.params.id);
        const wishlist = await Wishlist.findById(req.params.id);
        if (!wishlist) {
            console.warn("Wishlist tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Wishlist not found" });
        }

        await wishlist.deleteOne();
        console.log("Wishlist berhasil dihapus dengan ID:", req.params.id);
        res.status(200).json({ message: "Wishlist deleted" });
    } catch (err) {
        console.error("Terjadi kesalahan saat menghapus wishlist:", err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllWishlist,
    createWishlist,
    getWishlistById,
    updateWishlist,
    deleteWishlist
};
