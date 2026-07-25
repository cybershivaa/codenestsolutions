import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    // --- Auth ---
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    emailVerifyToken: { type: String, index: true },
    emailVerifyExpires: { type: Date },
    otpCode: { type: String },
    otpExpires: { type: Date },
    passwordResetToken: { type: String, index: true },
    passwordResetExpires: { type: Date },
    refreshTokenJti: { type: String, index: true }, // rotated on refresh/logout

    // --- Registration ---
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    companyName: { type: String, trim: true },
    country: { type: String, trim: true },
    referralCode: { type: String, trim: true },
    acceptedTerms: { type: Boolean, default: false },

    // --- Profile ---
    profilePhotoUrl: { type: String },
    companyLogoUrl: { type: String },
    industry: { type: String },
    gstNumber: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    website: { type: String },
    linkedin: { type: String },
    timezone: { type: String, default: "Asia/Kolkata" },

    // --- Metadata ---
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String },
    status: { type: String, enum: ["active", "suspended", "deleted"], default: "active" },
  },
  { timestamps: true },
);

clientSchema.methods.toSafeJSON = function () {
  const {
    passwordHash,
    emailVerifyToken,
    emailVerifyExpires,
    otpCode,
    otpExpires,
    passwordResetToken,
    passwordResetExpires,
    refreshTokenJti,
    __v,
    ...rest
  } = this.toObject({ versionKey: false });
  return rest;
};

export const Client = mongoose.model("Client", clientSchema);
