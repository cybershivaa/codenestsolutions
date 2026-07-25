import { verifyAccess } from "../utils/tokens.js";
import { Client } from "../models/Client.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing token" });
    const payload = verifyAccess(token);
    const client = await Client.findById(payload.sub);
    if (!client || client.status !== "active") {
      return res.status(401).json({ error: "Invalid session" });
    }
    req.client = client;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
