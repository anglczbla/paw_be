// models/testimoni.js
const mongoose = require("mongoose");

const testimoniSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    pemesanan_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pemesanan",
        required: true,
    },
    pengiriman_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pengiriman",
        required: true,
    },
    pesan: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
}, {
    timestamps: true,
});

const Testimoni = mongoose.model("Testimoni", testimoniSchema);

module.exports = Testimoni;