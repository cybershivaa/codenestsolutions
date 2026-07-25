import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as c from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

r.post("/register", authLimiter, validate(c.registerSchema), c.register);
r.post("/login", authLimiter, validate(c.loginSchema), c.login);
r.post("/logout", c.logout);
r.post("/refresh", c.refresh);
r.get("/me", requireAuth, c.me);

r.post("/verify-email", authLimiter, validate(c.verifyEmailSchema), c.verifyEmail);
r.post("/forgot-password", authLimiter, validate(c.emailOnly), c.forgotPassword);
r.post("/reset-password", authLimiter, validate(c.resetPasswordSchema), c.resetPassword);
r.post("/change-password", requireAuth, validate(c.changePasswordSchema), c.changePassword);

r.post("/send-otp", requireAuth, authLimiter, c.sendOtp);
r.post("/verify-otp", requireAuth, validate(c.otpSchema), c.verifyOtp);

export default r;
