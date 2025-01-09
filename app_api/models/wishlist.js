const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    produk_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produk", // Relasi dengan model Produk
        required: true
    },
    tanggal: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Ingin Dibeli", "Sudah Dibeli"], // Status wishlist
        default: "Ingin Dibeli"
    }
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
