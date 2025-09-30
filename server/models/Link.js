// backend/models/Link.js
const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    url: { type: String, required: true },
    password: { type: String, required: true },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // TTL index (delete at expiresAt)
    }
});

module.exports = mongoose.model("Link", linkSchema);
