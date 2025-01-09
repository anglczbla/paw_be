const Testimoni = require("../models/testimoni");
const express = require("express");
const router = express.Router();

// Mengambil semua testimoni dari database
const getAllTestimoni = async (req, res) => {
    try {
        console.log("Mengambil semua data testimoni...");
        const testimoni = await Testimoni.find().populate("pemesanan_id", "pengiriman_id");
        console.log("Data testimoni berhasil diambil:", testimoni);
        res.status(200).json(testimoni);
    } catch (err) {
        console.error("Terjadi kesalahan saat mengambil data testimoni:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Mengambil testimoni berdasarkan ID
const getTestimoniById = async (req, res) => {
    try {
        console.log("Mencari testimoni dengan ID:", req.params.id);
        const testimoni = await Testimoni.findById(req.params.id).populate("pemesanan_id", "pengiriman_id");
        if (!testimoni) {
            console.warn("Pemesanan tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Testimoni not found" });
        }
        console.log("Data testimoni ditemukan:", testimoni);
        res.status(200).json(testimoni);
    } catch (err) {
        console.error("Terjadi kesalahan saat mencari testimoni:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Membuat testimoni baru
const createTestimoni = async (req, res) => {
    console.log("Menerima data untuk membuat testimoni:", req.body);
    const testimoni = new Testimoni({
        nama: req.body.nama,
        pemesanan_id: req.body.pemesanan_id,
        pengiriman_id: req.body.pengiriman_id,
        pesan: req.body.pesan,
        rating: req.body.rating,
    });

    try {
        const newTestimoni = await testimoni.save();
        console.log("Data testimoni baru berhasil dibuat:", newTestimoni);
        res.status(201).json(newTestimoni);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Memperbarui data testimoni berdasarkan ID
const updateTestimoni = async (req, res) => {

    console.log("Menerima data untuk memperbarui testimoni:", req.body);

    const { nama, pemesanan_id, pengiriman_id, pesan, rating } = req.body;

    try {
        console.log("Mencari testimoni dengan ID:", req.params.id);
        const testimoni = await Testimoni.findById(req.params.id);
        if (!testimoni) {
            console.warn("Testimoni tidak ditemukan dengan ID:", req.params.id);
            return res.status(404).json({ message: "Testimoni not found" });
        }

        testimoni.nama = nama ?? testimoni.nama;
        testimoni.pemesanan_id = pemesanan_id ?? testimoni.pemesanan_id;
        testimoni.pengiriman_id = pengiriman_id ?? testimoni.pengiriman_id;
        testimoni.pesan = pesan ?? testimoni.pesan;
        testimoni.rating = rating ?? testimoni.rating;

        const updatedTestimoni = await testimoni.save();
        console.log("Data testimoni berhasil diperbarui:", updatedTestimoni);
        res.json(updatedTestimoni);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Menghapus testimoni berdasarkan ID
const deleteTestimoni = async (req, res) => {
    try {
        const testimoni = await Testimoni.findById(req.params.id);
        if (!testimoni) {
            return res.status(404).json({ message: "Testimoni not found" });
        }

        await testimoni.deleteOne();
        res.status(200).json({ message: "Testimoni deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllTestimoni, getTestimoniById, createTestimoni, updateTestimoni, deleteTestimoni };