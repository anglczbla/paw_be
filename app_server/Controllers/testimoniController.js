const axios = require("axios");

const index = async (req, res) => {
    try {
        // Mendapatkan data testimoni dari API eksternal
        const response = await axios.get(
           // untuk testimoni di ganti dengan pengiriman
        );
        // Mendapatkan data pengiriman dari API eksternal
        const pengirimanResponse = await axios.get(
          
        );

        const testimoni = response.data;
        const pengirimanList = pengirimanResponse.data;

        res.render("testimoni", {
            title: "Halaman Testimoni",
            testimoni, pengirimanList,
            layout: "main",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Gagal mendapatkan data testimoni dari API");
    }
};

const store = async (req, res) => {
    const { tanggalTestimoni, tanggalKirim, batasTestimoni, pengiriman_id } = req.body;
    try {
        const response = await axios.post(
            
            { tanggalTestimoni, tanggalKirim, batasTestimoni, pengiriman_id }
        );

        if (response.status === 200 || response.status === 201) {
            res.redirect("/testimoni");
        } else {
            res.status(500).send("Gagal menambahkan data testimoni.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menambahkan data testimoni.");
    }
};

const update = async (req, res) => {
    const { id, tanggalTestimoni, tanggalKirim, batasTestimoni, pengiriman_id } = req.body;

    try {
        const response = await axios.put(
           
            { tanggalTestimoni, tanggalKirim, batasTestimoni, pengiriman_id }
        );

        if (response.status === 200) {
            res.redirect("/testimoni"); // Redirect ke halaman utama setelah berhasil diubah
        } else {
            res.status(500).send("Gagal memperbarui data testimoni.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error memperbarui data testimoni.");
    }
};

const deleteTestimoni = async (req, res) => {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    try {
        const response = await axios.delete(
            
        );

        if (response.status === 200) {
            res.redirect("/testimoni"); // Redirect ke halaman utama setelah berhasil menghapus
        } else {
            res.status(500).send("Gagal menghapus testimoni.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menghapus testimoni.");
    }
};

module.exports = { index, store, update, deleteTestimoni };
