const axios = require("axios");

const index = async (req, res) => {
    try {
        // Mendapatkan data pemesanan dari API eksternal
        const response = await axios.get(
           
        );
        // Mendapatkan data produk dari API eksternal
        const produkResponse = await axios.get(
          
        );

        const pemesanan = response.data;
        const produkList = produkResponse.data;

        res.render("pemesanan", {
            title: "Halaman pemesanan",
            pemesanan, produkList,
            layout: "main",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Gagal mendapatkan data pemesanan dari API");
    }
};

const store = async (req, res) => {
    const { tanggalPesan, tanggalKirim, batasPesan, produk_id } = req.body;
    try {
        const response = await axios.post(
            
            { tanggalPesan, tanggalKirim, batasPesan, produk_id }
        );

        if (response.status === 200 || response.status === 201) {
            res.redirect("/pemesanan");
        } else {
            res.status(500).send("Gagal menambahkan data pemesanan.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menambahkan data pemesanan.");
    }
};

const update = async (req, res) => {
    const { id, tanggalPesan, tanggalKirim, batasPesan, produk_id } = req.body;

    try {
        const response = await axios.put(
           
            { tanggalPesan, tanggalKirim, batasPesan, produk_id }
        );

        if (response.status === 200) {
            res.redirect("/pemesanan"); // Redirect ke halaman utama setelah berhasil diubah
        } else {
            res.status(500).send("Gagal memperbarui data pemesanan.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error memperbarui data pemesanan.");
    }
};

const deletepemesanan = async (req, res) => {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    try {
        const response = await axios.delete(
            
        );

        if (response.status === 200) {
            res.redirect("/pemesanan"); // Redirect ke halaman utama setelah berhasil menghapus
        } else {
            res.status(500).send("Gagal menghapus pemesanan.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menghapus pemesanan.");
    }
};

module.exports = { index, store, update, deletepemesanan };
