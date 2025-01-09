const index = (req, res) => {
    const skincare = [
      {
        
        produks: "Innisfree Daily UV Protection Cream SPF 35/PA++",
        isi: "Melindungi kulit dari sinar UV, mencegah penuaan dini, dan memberikan kelembapan",
        gambar: "img/img1.jpg"
      },
      {
        produks: "Innisfree Green Tea Seed Serum",
        isi: "Menghidrasi kulit, memberikan efek segar, dan membantu menjaga kelembapan kulit.",
        gambar: "img/img2.jpg"
      },
      {
        produks: "Innisfree Jeju Volcanic Pore Toner",
        isi: "Mengurangi tampilan pori-pori besar dan menyeimbangkan minyak di wajahMengurangi tampilan pori-pori besar dan menyeimbangkan minyak di wajah",
        gambar: "img/img3.jpg"
      },
      {
        produks: "Skintific 5X Ceramide UV Shield SPF 50+ PA++++",
        isi: "Perlindungan tinggi dari sinar UV sambil memperbaiki skin barrier dan memberikan kelembapan",
        gambar: "img/img4.jpg"
      },
      {
        produks: "Skintific Hydrating Toner",
        isi: "Menyegarkan kulit dan menyeimbangkan kelembapan kulit.",
        gambar: "img/img5.jpg"
      },
      {
        produks: "Skintific 5X Ceramide Moisturizer",
        isi: "Melembapkan dan memperbaiki skin barrier.",
        gambar: "img/img6.jpg"
      },
    ];
    res.render("home", { title: "halaman home", skincare, layout: "main" });
  };
  
  const about = (req, res) => {
    res.render("about", { title: "About", layout: "main" });
  };
  const contact = (req, res) => {
    res.render("contact", { title: "Contact Us!", layout: "main" });
  };
  
  const use =
    ("/",
    (req, res) => {
      res.send("<h1>404 Not Found</h1>");
    });
  module.exports = { index, use, about,contact };
  