import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import { errorHandler, notFound } from "./middleware/error.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Global limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get("/healthz", (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.use(notFound);
app.use(errorHandler);

const port = env.PORT;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`[api] listening on :${port} (env=${env.NODE_ENV})`);
  });
});
