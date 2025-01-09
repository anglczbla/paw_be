const mongoose = require("mongoose");

const pengirimanSchema = new mongoose.Schema({
    alamat: {
        type: String,
        required: true,
        trim: true
    },
    kota: {
        type: String,
        required: true,
        trim: true
    },
    kodePos: {
        type: String,
        required: true,
        trim: true
    },
    negara: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "canceled"],
        required: true,
        trim : true,
    },
    pemesanan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pemesanan",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

pengirimanSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Pengiriman", pengirimanSchema);
