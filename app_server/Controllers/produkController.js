const axios = require("axios");

const index = async (req, res) => {
    try {
        // mendapatkan data produk dari API eksternal
        const response = await axios.get(
            
            // cloud mongodb
        );

        const produk = response.data;

        res.render("produk", {
            title: "Halaman Produk",
            produk,
            layout: "main",
        });
    }catch (error)  {
        console.error(error.mesage);
        res.status(500).send("Gagal mendapatkan data produk dari api");
    }
};

const store = async (req, res) => {
    const { nama, brand, tahun, jenis } = req.body;
    try {
      const response = await fetch(
            
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama, brand, tahun, jenis }),
        }
      );
  
      if (response.ok) {
        res.redirect("/produk"); // Redirect ke halaman produk setelah berhasil menambah
      } else {
        res.status(500).send("Gagal menambahkan data produk.");
      }
    } catch (error) {
      res.status(500).send("Error menambahkan data produk");
    }
  };

  const update = async (req, res) => {
    const { id } = req.params; // ID produk yang diterima dari URL
    const { nama, brand, tahun, jenis } = req.body;

    console.log("Data untuk update:", { id, nama, brand, tahun, jenis });

    try {
        const response = await axios.put({
            nama,
            brand,
            tahun,
            jenis,
        });

        if (response.status === 200) {
            res.redirect("/produk");
        } else {
            res.status(500).send("Gagal memperbarui data produk.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error memperbarui data produk");
    }
};

const deleteProduk = async (req, res) => {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    try {
        const response = await axios.delete(
            
        );

        if (response.status === 200) {
            res.redirect("/produk"); // Redirect ke halaman utama setelah berhasil menghapus
        } else {
            res.status(500).send("Gagal menghapus produk.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menghapus produk.");
    }
};


module.exports = { index, store, update, deleteProduk};
