import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articles.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Backend running on :${process.env.PORT || 4000}`);
});
