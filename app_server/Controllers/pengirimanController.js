const axios = require("axios");

const index = async (req, res) => {
    try {
        // Mendapatkan data pengiriman dari API eksternal
        const response = await axios.get(
           
        );
        // Mendapatkan data pemesanan dari API eksternal
        const pemesananResponse = await axios.get(
            
        );

        const pengiriman = response.data;
        const pemesananList = pemesananResponse.data;

        res.render("pengiriman", {
            title: "Halaman Pengiriman",
            pengiriman,
            pemesananList,
            layout: "main",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Gagal mendapatkan data pengiriman dari API");
    }
};

const store = async (req, res) => {
    const { tanggalPengiriman, tanggalKirim, batasPengiriman, pemesanan_id } = req.body;
    try {
        const response = await axios.post(
           
            { tanggalPengiriman, tanggalKirim, batasPengiriman, pemesanan_id }
        );

        if (response.status === 200 || response.status === 201) {
            res.redirect("/pengiriman");
        } else {
            res.status(500).send("Gagal menambahkan data pengiriman.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menambahkan data pengiriman.");
    }
};

const update = async (req, res) => {
    const { id, tanggalPengiriman, tanggalKirim, batasPengiriman, pemesanan_id } = req.body;

    try {
        const response = await axios.put(
            
        );

        if (response.status === 200) {
            res.redirect("/pengiriman"); // Redirect ke halaman utama setelah berhasil diubah
        } else {
            res.status(500).send("Gagal memperbarui data pengiriman.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error memperbarui data pengiriman.");
    }
};

const deletePengiriman = async (req, res) => {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    try {
        const response = await axios.delete(
            
        );

        if (response.status === 200) {
            res.redirect("/pengiriman"); // Redirect ke halaman utama setelah berhasil menghapus
        } else {
            res.status(500).send("Gagal menghapus pengiriman.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menghapus pengiriman.");
    }
};

module.exports = { index, store, update, deletePengiriman };
