// supabaseClient.js
const dotenv = require("dotenv");
dotenv.config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing. Check your .env file");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
