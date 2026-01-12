import "dotenv/config";
import app from "./app.js";
import pool from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
(async () => {
    try {
        await pool.query("SELECT 1");
        console.log("✅ MySQL connected successfully");
    } catch (error) {
        console.error("❌ MySQL connection failed:", error.message);
    }
})();
