require("dotenv").config();

const app = require("./app");
const db = require("./database/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Check PostgreSQL connection
        await db.query("SELECT NOW()");

        console.log("✅ PostgreSQL Connected Successfully");

        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ Database Connection Failed");
        console.error(err);
    }
}

startServer();