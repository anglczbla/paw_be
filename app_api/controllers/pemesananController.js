const Pemesanan = require("../models/pemesanan");
const express = require("express");
const router = express.Router();

// Mengambil semua data pemesanan
const getAllPemesanan = async (req, res) => {
    try {
        console.log("Mengambil semua data pemesanan...");
        const pemesanan = await Pemesanan.find().populate("produk_id", "nama merek kadaluarsa jenis");
        console.log("Data pemesanan berhasil diambil:", pemesanan);
        res.status(200).json(pemesanan);
    } catch (err) {
        console.error("Terjadi kesalahan saat mengambil data pemesanan:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Mengambil data pemesanan berdasarkan ID
const getPemesananById = async (req, res) => {
    try {
        console.log("Mencari pemesanan dengan ID:", req.params.id);
        const pemesanan = await Pemesanan.findById(req.params.id).populate("produk_id", "nama merek kadaluarsa jenis");
        if (!pemesanan) {
            console.warn("Pemesanan tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Pemesanan not found" });
        }
        console.log("Data pemesanan ditemukan:", pemesanan);
        res.status(200).json(pemesanan);
    } catch (err) {
        console.error("Terjadi kesalahan saat mencari pemesanan:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Membuat data pemesanan baru
const createPemesanan = async (req, res) => {
    console.log("Menerima data untuk membuat pemesanan:", req.body);

    // Validasi sederhana
    if (!req.body.produk_id || !req.body.order) {
        console.warn("Data pemesanan tidak valid:", req.body);
        return res.status(400).json({ message: "produk_id dan order harus diisi." });
    }

    const pemesanan = new Pemesanan({
        nama: req.body.nama,
        order: req.body.order,
        selesai: req.body.selesai,
        batasOrder: req.body.batasOrder,
        produk_id: req.body.produk_id,
    });

    try {
        const newPemesanan = await pemesanan.save();
        console.log("Data pemesanan baru berhasil dibuat:", newPemesanan);
        res.status(201).json(newPemesanan);
    } catch (err) {
        console.error("Terjadi kesalahan saat membuat pemesanan:", err.message);
        res.status(400).json({ message: err.message });
    }
};

// Memperbarui data pemesanan berdasarkan ID
const updatePemesanan = async (req, res) => {
    console.log("Menerima data untuk memperbarui pemesanan:", req.body);

    const { nama, order, selesai, batasOrder, produk_id } = req.body;

    try {
        console.log("Mencari pemesanan dengan ID:", req.params.id);
        const pemesanan = await Pemesanan.findById(req.params.id);
        if (!pemesanan) {
            console.warn("Pemesanan tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Pemesanan not found" });
        }

        // Perbarui field pemesanan
        pemesanan.nama = nama ?? pemesanan.nama;
        pemesanan.order = order ?? pemesanan.order;
        pemesanan.selesai = selesai ?? pemesanan.selesai;
        pemesanan.batasOrder = batasOrder ?? pemesanan.batasOrder;
        pemesanan.produk_id = produk_id ?? pemesanan.produk_id;

        const updatedPemesanan = await pemesanan.save();
        console.log("Data pemesanan berhasil diperbarui:", updatedPemesanan);
        res.json(updatedPemesanan);
    } catch (error) {
        console.error("Terjadi kesalahan saat memperbarui pemesanan:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Menghapus data pemesanan berdasarkan ID
const deletePemesanan = async (req, res) => {
    try {
        console.log("Mencari pemesanan untuk dihapus dengan ID:", req.params.id);
        const pemesanan = await Pemesanan.findById(req.params.id);
        if (!pemesanan) {
            console.warn("Pemesanan tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Pemesanan not found" });
        }

        await pemesanan.deleteOne();
        console.log("Pemesanan berhasil dihapus dengan ID:", req.params.id);
        res.status(200).json({ message: "Pemesanan deleted" });
    } catch (err) {
        console.error("Terjadi kesalahan saat menghapus pemesanan:", err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllPemesanan,
    createPemesanan,
    getPemesananById,
    updatePemesanan,
    deletePemesanan
};
