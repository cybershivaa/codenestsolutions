import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { env } from "../config/env.js";

export function signAccessToken(client) {
  return jwt.sign(
    { sub: String(client._id), email: client.email, kind: "client" },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_TTL },
  );
}

export function signRefreshToken(client, jti) {
  return jwt.sign({ sub: String(client._id), jti }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_TTL,
  });
}

export function verifyAccess(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
}
export function verifyRefresh(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}

export function newOpaqueToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}
export function newJti() {
  return crypto.randomBytes(16).toString("hex");
}
export function newOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const refreshMaxAgeMs = () => {
  // parse "30d" / "12h" / "3600s" / raw number of seconds
  const v = env.JWT_REFRESH_TTL;
  if (/^\d+$/.test(v)) return Number(v) * 1000;
  const m = /^(\d+)([smhd])$/.exec(v);
  if (!m) return 30 * 24 * 60 * 60 * 1000;
  const n = Number(m[1]);
  const mult = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }[m[2]];
  return n * mult;
};

export function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SECURE ? "none" : "lax",
    domain: env.COOKIE_DOMAIN,
    path: "/auth",
    maxAge: refreshMaxAgeMs(),
  };
}
export const REFRESH_COOKIE = "cn_rt";
