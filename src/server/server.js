const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = reequire("jsonwebtoken");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kamal@321",
  database: "node_js",
});

db.connect((err) => {
  if (err) {
    console.log("Failed to connect database");
  }
  console.log("MySQL connected successfully!");
});

//Register user(signup)
app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users(user_name, email, password_hash) VALUES (?, ?)",
    [userName, email, password],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error in registering. Try again!");
      }
      res.status(201).send("USer created successfully!");
    }
  );
});

//Login (signup)
app.post("/login", (req, res) => {
  const { userName, email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE user_name = ? AND email = ?",
    [userName, email],
    async (err, results) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      if (result.length === 0) {
        return res.status(401).send("User not found");
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).send("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id }, "", { expiresIn: "1h" });
      res.json({ token });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
