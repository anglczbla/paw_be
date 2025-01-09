const Produk = require("../models/produk");

// Mengambil semua produk dari database
const getAllProduk = async (req, res) => {
    try {
        const produk = await Produk.find();
        res.status(200).json(produk);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mengambil produk berdasarkan ID
const getProdukById = async (req, res) => {
    try {
        const produk = await Produk.findById(req.params.id);
        if (!produk) {
            return res.status(404).json({ message: "Produk not found" });
        }
        res.status(200).json(produk);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Membuat produk baru
const createProduk = async (req, res) => {
    const produk = new Produk({
        nama: req.body.nama,
        deskripsi: req.body.deskripsi,
        harga: req.body.harga,
        kategori: req.body.kategori,
    });

    try {
        const newProduk = await produk.save();
        res.status(201).json(newProduk);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Memperbarui data produk berdasarkan ID
const updateProduk = async (req, res) => {
    try {
        const produk = await Produk.findById(req.params.id);
        if (!produk) {
            return res.status(404).json({ message: "Produk not found" });
        }

        if (req.body.nama != null) {
            produk.nama = req.body.nama;
        }
        if (req.body.deskripsi != null) {
            produk.deskripsi = req.body.deskripsi;
        }
        if (req.body.harga != null) {
            produk.harga = req.body.harga;
        }
        if (req.body.kategori != null) {
            produk.kategori = req.body.kategori;
        }

        const updatedProduk = await produk.save();
        res.status(200).json(updatedProduk);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Menghapus produk berdasarkan ID
const deleteProduk = async (req, res) => {
    try {
        const produk = await Produk.findById(req.params.id);
        if (!produk) {
            return res.status(404).json({ message: "Produk not found" });
        }

        await produk.deleteOne();
        res.status(200).json({ message: "Produk deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllProduk, getProdukById, createProduk, updateProduk, deleteProduk };
