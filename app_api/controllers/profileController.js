const profile = require("../models/profile");
const Produk = require("../models/produk");
const User = require ("../models/user"); // Jalur harus sesuai dengan struktur folder

// Fungsi untuk menambahkan data profile baru
exports.createProfile = async (req, res) => {
    const { name, email, age, produk_id } = req.body;

    try {
        const produk = await Produk.findById(produk_id);
        if (!produk) return res.status(404).json({ message: "Produk not found" });

        const profile = new Profile({
            name,
            email,
            age,
            produk_id,
        });

        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fungsi untuk mendapatkan semua data profile
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate("produk_id", "nama deskripsi harga");
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fungsi untuk mendapatkan data profile berdasarkan ID
exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate("produk_id", "nama deskripsi harga");
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fungsi untuk memperbarui data profile
exports.updateProfile = async (req, res) => {
    const { name, email, age, produk_id } = req.body;

    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        profile.name = name ?? profile.name;
        profile.email = email ?? profile.email;
        profile.age = age ?? profile.age;
        profile.produk_id = produk_id ?? profile.produk_id;

        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fungsi untuk menghapus data profile
exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        res.json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
