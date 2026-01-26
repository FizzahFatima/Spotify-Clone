const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const pool = require("./config");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "../views")));

// View engine setup
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "../views"));

// Pages
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// ✅ Register User
app.post("/signup", async (req, res) => {                         //to enter data
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render("signup", { error: "Please fill all fields" });
    }

    try {
        pool.query('SELECT * FROM users WHERE name = ?', [username], async (err, results) => {
            if (err) return res.render("signup", { error: "❌ Database error" });

            if (results.length > 0) {
                return res.render("signup", { error: "⚠️ User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            pool.query('INSERT INTO users (name, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
                if (err) return res.render("signup", { error: "❌ Error saving user" });

                res.redirect("/login");
            });
        });
    } catch (err) {
        res.render("signup", { error: "❌ Something went wrong" });
    }
});

// ✅ Login User
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render("login", { error: "Please enter both email and password" });
    }

    pool.query('SELECT * FROM users WHERE name = ?', [username], async (err, results) => {
        if (err) return res.render("login", { error: "❌ Database error" });
        if (results.length === 0) return res.render("login", { error: "⚠️ User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.render("login", { error: "❌ Wrong password" });

        res.render("clone");
    });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running: http://localhost:${PORT}`);
});
