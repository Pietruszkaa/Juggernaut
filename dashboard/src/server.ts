import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// statyczne pliki
app.use("/", express.static(path.join(__dirname, "../public")));

// API
import guildRoutes from "./routes/guilds";
app.use("/api/guilds", guildRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`[dashboard] running at http://localhost:${PORT}`);
});
