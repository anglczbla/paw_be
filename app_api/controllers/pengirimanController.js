const Pengiriman = require("../models/pengiriman");
const express = require("express");
const router = express.Router();

// Mengambil semua data pengiriman dari database
const getAllPengiriman = async (req, res) => {
    try {
        console.log("Mengambil semua data pengiriman...");
        // Mengambil data pengiriman dengan populate pada pemesanan_id
        const pengiriman = await Pengiriman.find().populate("pemesanan_id");
        
        // Log data pengiriman yang berhasil diambil
        console.log("Data pengiriman berhasil diambil:", pengiriman);
        
        // Mengembalikan respon sukses dengan data pengiriman
        res.status(200).json(pengiriman);
    } catch (err) {
        // Log error jika terjadi kesalahan
        console.error("Terjadi kesalahan saat mengambil data pengiriman:", err.message);
        
        // Mengembalikan respon error
        res.status(500).json({ message: err.message });
    }
};


// Mengambil data pengiriman berdasarkan ID
const getPengirimanById = async (req, res) => {
    try {
        console.log("Mencari pengiriman dengan ID:", req.params.id);
        const pengiriman = await Pengiriman.findById(req.params.id).populate("pemesanan_id");
        if (!pengiriman) {
            console.warn("Pengiriman tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Pengiriman not found" });
        }
        console.log("Data pengiriman ditemukan:", pengiriman);
        res.status(200).json(pengiriman);
    } catch (err) {
        console.error("Terjadi kesalahan saat mencari pengiriman:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Membuat data pengiriman baru
const createPengiriman = async (req, res) => {
    console.log("Menerima data untuk membuat pengiriman:", req.body);

    const pengiriman = new Pengiriman({
        alamat: req.body.alamat,
        kota: req.body.kota,
        kodePos: req.body.kodePos,
        negara: req.body.negara,
        status: req.body.status,
        pemesanan_id : req.body.pemesanan_id,
    });

    try {
        const newPengiriman = await pengiriman.save();
        console.log("Data pengiriman baru berhasil dibuat:", newPengiriman);
        res.status(201).json(newPengiriman);
    } catch (err) {
        console.error("Terjadi kesalahan saat membuat pengiriman:", err.message);
        res.status(400).json({ message: err.message });
    }
};

// Memperbarui data pengiriman berdasarkan ID
const updatePengiriman = async (req, res) => {

    console.log("Menerima data untuk memperbarui pengiriman:", req.body);

    const { pemesanan_id, alamat, kota, kodePos, negara, status} = req.body;

    try {
        console.log("Mencari pengiriman dengan ID:", req.params.id);
        const pengiriman = await Pengiriman.findById(req.params.id);
        if (!pengiriman) {
            console.warn("Pengiriman tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Pengiriman not found" });
        }

        pengiriman.pemesanan_id =  pemesanan_id ?? pengiriman.pemesanan_id;
        pengiriman.alamat = alamat ?? pengiriman.alamat;
        pengiriman.kota = kota ?? pengiriman.kota;
        pengiriman.kodePos  = kodePos ?? pengiriman.kodePos;
        pengiriman.negara  = negara ?? pengiriman.negara;
        pengiriman.status  = status ?? pengiriman.status;


        const updatedPengiriman = await pengiriman.save();
        console.log("Data pengiriman berhasil diperbarui:", updatedPengiriman);
        res.status(200).json(updatedPengiriman);
    } catch (err) {
        console.error("Terjadi kesalahan saat memperbarui pengiriman:", error.message);
        res.status(400).json({ message: err.message });
    }
};

// Menghapus data pengiriman berdasarkan ID
const deletePengiriman = async (req, res) => {
    try {
        console.log("Mencari pengiriman untuk dihapus dengan ID:", req.params.id);
        const pengiriman = await Pengiriman.findById(req.params.id);
        if (!pengiriman) {
            console.warn("Pengiriman tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Pengiriman not found" });
        }

        await pengiriman.deleteOne();
        res.status(200).json({ message: "Pengiriman deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllPengiriman, getPengirimanById, createPengiriman, updatePengiriman, deletePengiriman };
