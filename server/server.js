// server/server.js

// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const supabase = require("./supabaseClient");
const app = express();
app.use(cors());
app.use(express.json());

// Create a new link (store in Supabase)
app.post("/api/link", async (req, res) => {
    const { url, password } = req.body;

    const noExpiryPasswords = ["261003", "123456"];

    let expiresAt;

    if (noExpiryPasswords.includes(password)) {
        // Far future date (100 years)
        expiresAt = new Date("2125-01-01").toISOString();
    } else {
        expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    }

    const { data, error } = await supabase
        .from("links")
        .insert([{ url, password, expires_at: expiresAt }])
        .select();

    if (error) {
        console.error("Supabase insert error:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json({
        message: noExpiryPasswords.includes(password)
            ? "Permanent link saved"
            : "Temporary link saved",
        id: data[0].id,
    });
});

// Get link by password
app.post("/api/link/get", async (req, res) => {
    const { password } = req.body;

    const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("password", password)
        .single();

    if (error || !data) {
        return res.status(404).json({ error: "Link not found" });
    }

    // If expires_at exists, check expiry
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
        await supabase.from("links").delete().eq("id", data.id);
        return res.status(410).json({ error: "Link expired" });
    }

    res.json({ url: data.url });
});

// ------------------------------
// 🔄 Automatic cleanup every 10 minutes
// ------------------------------
setInterval(async () => {
    try {
        const { error } = await supabase
            .from("links")
            .delete()
            .lt("expires_at", new Date().toISOString());

        if (error) {
            console.error("Cleanup error:", error.message);
        } else {
            console.log("Expired links cleaned up");
        }
    } catch (err) {
        console.error("Unexpected cleanup error:", err.message);
    }
}, 10 * 60 * 1000); // run every 10 minutes

// ------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
