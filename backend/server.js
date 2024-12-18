const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware untuk meningkatkan batas ukuran body request
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE", "POST"],
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "ayune_database",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

// Endpoint Signup
app.post("/api/signup", (req, res) => {
  const { name, email, phone, password, confirmPassword, gender, birthdate } =
    req.body;

  // Validasi input
  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword ||
    !gender ||
    !birthdate
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Simpan data ke tabel users
  const userQuery =
    "INSERT INTO users (nama_user, email_user, no_hp_user, jk_user, tgl_user) VALUES (?, ?, ?, ?, ?)";
  const userValues = [
    name,
    email,
    phone,
    gender === "L" ? "L" : "P",
    birthdate,
  ];

  db.query(userQuery, userValues, (err, result) => {
    if (err) {
      console.error("Error inserting user data:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    const userId = result.insertId;
    const signupQuery =
      "INSERT INTO sign_up (id_user, pw_user, konfir_pw_user) VALUES (?, ?, ?)";
    const signupValues = [userId, password, confirmPassword];

    db.query(signupQuery, signupValues, (err, result) => {
      if (err) {
        console.error("Error inserting signup data:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// Endpoint Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Cari pengguna berdasarkan email dan password di tabel sign_up
  const loginQuery = `
    SELECT users.*, sign_up.pw_user
    FROM users
    INNER JOIN sign_up ON users.id = sign_up.id_user
    WHERE users.email_user = ? AND sign_up.pw_user = ?
  `;

  db.query(loginQuery, [email, password], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    // Buat token JWT
    const token = jwt.sign(
      { email: user.email_user, id: user.id },
      "secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user });
  });
});

// Konfigurasi socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Ganti dengan asal klien Anda
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", (message) => {
    io.emit("message", message); // Kirim pesan ke semua klien
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Endpoint CRUD untuk tabel users

// Menampilkan semua data user
app.get("/api/users", (req, res) => {
  const query = `
    SELECT u.*, t.nama_tipe AS nama_tipe_kulit, m.nama_masalah AS nama_masalah_kulit 
    FROM users u
    LEFT JOIN tipe_kulit t ON u.id_tipe_kulit = t.id
    LEFT JOIN masalah_kulit m ON u.id_masalah_kulit = m.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    console.log("Data pengguna yang diambil:", results);
    res.status(200).json(results);
  });
});

// Endpoint Menambah data user baru
app.post("/api/users", (req, res) => {
  const {
    nama_user,
    email_user,
    no_hp_user,
    jk_user,
    tgl_user,
    koin,
    id_tipe_kulit,
    id_masalah_kulit,
  } = req.body;
  console.log("POST /api/users", req.body); // Logging input data
  console.log("Values:", [
    nama_user,
    email_user,
    no_hp_user,
    jk_user,
    tgl_user,
    koin,
    id_tipe_kulit,
    id_masalah_kulit,
  ]);
  const query =
    "INSERT INTO users (nama_user, email_user, no_hp_user, jk_user, tgl_user, koin, id_tipe_kulit, id_masalah_kulit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      nama_user,
      email_user,
      no_hp_user,
      jk_user,
      tgl_user,
      koin,
      id_tipe_kulit,
      id_masalah_kulit,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({ message: "User added successfully" });
    }
  );
});

// Endpoint Mengedit data user
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const {
    nama_user,
    email_user,
    no_hp_user,
    jk_user,
    tgl_user,
    koin,
    id_tipe_kulit,
    id_masalah_kulit,
  } = req.body;
  console.log("PUT /api/users/:id", req.body);
  const query =
    "UPDATE users SET nama_user = ?, email_user = ?, no_hp_user = ?, jk_user = ?, tgl_user = ?, koin = ?, id_tipe_kulit = ?, id_masalah_kulit = ? WHERE id = ?";
  db.query(
    query,
    [
      nama_user,
      email_user,
      no_hp_user,
      jk_user,
      tgl_user,
      koin,
      id_tipe_kulit,
      id_masalah_kulit,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "User updated successfully" });
    }
  );
});

// Endpoint Menghapus data user
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("DELETE /api/users/:id", id); // Logging ID
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
});

// Endpoint CRUD untuk tabel dokters

// Menampilkan semua data dokter
app.get("/api/dokters", (req, res) => {
  const query = "SELECT * FROM dokters";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching dokters:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json(results);
  });
});

// Menampilkan semua data dokter unutk ahli.jsx
app.get("/api/dokters", (req, res) => {
  const sql = "SELECT * FROM dokters";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

// Menambah data dokter baru
app.post("/api/dokters", (req, res) => {
  const {
    nama_dokter,
    gambar,
    bidang_dokter,
    riwayat_dokter,
    jadwal,
    harga_dokter,
    is_available,
    rating,
  } = req.body;
  const query =
    "INSERT INTO dokters (nama_dokter, gambar, bidang_dokter, riwayat_dokter, jadwal, harga_dokter, is_available, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      nama_dokter,
      gambar,
      bidang_dokter,
      riwayat_dokter,
      jadwal,
      harga_dokter,
      is_available,
      rating,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting dokter:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({ message: "Dokter added successfully" });
    }
  );
});

// Mengedit data dokter
app.put("/api/dokters/:id", (req, res) => {
  const { id } = req.params;
  const {
    nama_dokter,
    gambar,
    bidang_dokter,
    riwayat_dokter,
    jadwal,
    harga_dokter,
    is_available,
    rating,
  } = req.body;
  const query =
    "UPDATE dokters SET nama_dokter = ?, gambar = ?, bidang_dokter = ?, riwayat_dokter = ?, jadwal = ?, harga_dokter = ?, is_available = ?, rating = ? WHERE id = ?";
  db.query(
    query,
    [
      nama_dokter,
      gambar,
      bidang_dokter,
      riwayat_dokter,
      jadwal,
      harga_dokter,
      is_available,
      rating,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating dokter:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Dokter updated successfully" });
    }
  );
});

// Menghapus data dokter
app.delete("/api/dokters/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM dokters WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting dokter:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Dokter deleted successfully" });
  });
});

// Endpoint CRUD untuk tabel produk

// Menampilkan semua data produk beserta tipe kulit dan masalah kulit
app.get("/api/produk", (req, res) => {
  const query = `
    SELECT p.*, b.nama_brand, k.nama_kategori, 
           GROUP_CONCAT(DISTINCT t.nama_tipe ORDER BY t.nama_tipe SEPARATOR ', ') AS tipe_kulit, 
           GROUP_CONCAT(DISTINCT m.nama_masalah ORDER BY m.nama_masalah SEPARATOR ', ') AS masalah_kulit, 
           p.kisaran_harga AS harga
    FROM produk p
    LEFT JOIN brand b ON p.id_brand = b.id
    LEFT JOIN kategori k ON p.id_kategori = k.id
    LEFT JOIN produk_tipe_kulit pt ON p.id = pt.id_produk
    LEFT JOIN tipe_kulit t ON pt.id_tipe_kulit = t.id
    LEFT JOIN produk_masalah_kulit pm ON p.id = pm.id_produk
    LEFT JOIN masalah_kulit m ON pm.id_masalah_kulit = m.id
    GROUP BY p.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching produk:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json(results);
  });
});

app.get("/api/tipe-kulit", (req, res) => {
  const query = "SELECT * FROM tipe_kulit";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching tipe kulit:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json(results);
  });
});

app.get("/api/masalah-kulit", (req, res) => {
  const query = "SELECT * FROM masalah_kulit";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching masalah kulit:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json(results);
  });
});

app.put("/api/produk/:id", (req, res) => {
  const { id } = req.params;
  const {
    id_brand,
    nama,
    id_kategori,
    kisaran_harga,
    id_tipe_kulit,
    id_masalah,
  } = req.body;
  console.log("PUT /api/produk/:id", req.body);

  if (
    !id_brand ||
    !nama ||
    !id_kategori ||
    !kisaran_harga ||
    !id_tipe_kulit ||
    !id_masalah
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query =
    "UPDATE produk SET id_brand = ?, nama_produk = ?, id_kategori = ?, kisaran_harga = ?, id_tipe_kulit = ?, id_masalah = ? WHERE id = ?";
  db.query(
    query,
    [id_brand, nama, id_kategori, kisaran_harga, id_tipe_kulit, id_masalah, id],
    (err, result) => {
      if (err) {
        console.error("Error updating produk:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Produk updated successfully" });
    }
  );
});

// Tambah produk
app.post("/api/produk", (req, res) => {
  const {
    id_brand,
    nama,
    id_kategori,
    kisaran_harga,
    id_tipe_kulit,
    id_masalah,
    gambar = "",
  } = req.body;
  console.log("POST /api/produk", req.body);

  if (
    !id_brand ||
    !nama ||
    !id_kategori ||
    !kisaran_harga ||
    !id_tipe_kulit ||
    !id_masalah
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query =
    "INSERT INTO produk (id_brand, nama_produk, id_kategori, kisaran_harga, id_tipe_kulit, id_masalah, gambar) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      id_brand,
      nama,
      id_kategori,
      kisaran_harga,
      id_tipe_kulit,
      id_masalah,
      gambar,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting produk:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({ message: "Produk added successfully" });
    }
  );
});

// Menghapus data produk
app.delete("/api/produk/:id", (req, res) => {
  const { id } = req.params;

  // Hapus data terkait di tabel `produk_tipe_kulit`
  const deleteTipeKulitQuery =
    "DELETE FROM produk_tipe_kulit WHERE id_produk = ?";
  db.query(deleteTipeKulitQuery, [id], (err, result) => {
    if (err) {
      console.error("Error deleting related data in produk_tipe_kulit:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    // Hapus data terkait di tabel `produk_masalah_kulit`
    const deleteMasalahKulitQuery =
      "DELETE FROM produk_masalah_kulit WHERE id_produk = ?";
    db.query(deleteMasalahKulitQuery, [id], (err, result) => {
      if (err) {
        console.error(
          "Error deleting related data in produk_masalah_kulit:",
          err
        );
        return res.status(500).json({ message: "Database error", error: err });
      }

      // Hapus data di tabel `produk`
      const deleteProdukQuery = "DELETE FROM produk WHERE id = ?";
      db.query(deleteProdukQuery, [id], (err, result) => {
        if (err) {
          console.error("Error deleting produk:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        res.status(200).json({ message: "Produk deleted successfully" });
      });
    });
  });
});

// Ambil data deskripsi di produk
app.get("/api/produk/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM produk WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching produk:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Produk not found" });
    }
    res.status(200).json(result[0]);
  });
});

app.put("/api/produk/:id", (req, res) => {
  const { id } = req.params;
  const {
    deskripsi,
    komposisi,
    cara_pemakaian,
    kisaran_harga,
    link_shoppe,
    link_tokopedia,
  } = req.body;

  // Logging data yang diterima
  console.log("PUT /api/produk/:id", req.body);

  // Validasi data
  if (
    !deskripsi ||
    !komposisi ||
    !cara_pemakaian ||
    !kisaran_harga ||
    !link_shoppe ||
    !link_tokopedia
  ) {
    console.error("Error: Data produk tidak lengkap", req.body);
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
  UPDATE produk 
  SET deskripsi = ?, komposisi = ?, cara_pemakaian = ?, kisaran_harga = ?, link_shoppe = ?, link_tokopedia = ? 
  WHERE id = ?`;

  db.query(
    query,
    [
      deskripsi,
      komposisi,
      cara_pemakaian,
      kisaran_harga,
      link_shoppe,
      link_tokopedia,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating produk:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Produk updated successfully" });
    }
  );
});

// Endpoint untuk mendapatkan data profil pengguna berdasarkan ID
app.get("/api/user/profile/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result[0]);
  });
});

// Endpoint untuk memperbarui data profil pengguna
app.post("/api/user/profile", (req, res) => {
  const { userId, id_tipe_kulit, id_masalah_kulit } = req.body;
  const query =
    "UPDATE users SET id_tipe_kulit = ?, id_masalah_kulit = ? WHERE id = ?";
  db.query(query, [id_tipe_kulit, id_masalah_kulit, userId], (err, result) => {
    if (err) {
      console.error("Error updating user profile:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Profile updated successfully" });
  });
});

// Mengambil produk dari database dan mengirimkan nama gambar ke frontend
app.get("/api/produk", (req, res) => {
  // Query database untuk mendapatkan produk
  const query = "SELECT * FROM produk";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Gagal mengambil produk" });
    }
    res.json(results); // Mengirim data produk, termasuk URL gambar
  });
});

// Jalankan server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
