// Phase 2/3 model stubs. Full controllers land in follow-up phases;
// the schemas are declared here so indexes are created ahead of time.

import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const projectSchema = new Schema(
  {
    projectId: { type: String, unique: true, index: true }, // e.g. CN-2026-000123
    client: { type: Types.ObjectId, ref: "Client", required: true, index: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["website", "mobile-app", "erp", "crm", "ai", "custom-software"],
      required: true,
    },
    description: String,
    businessGoal: String,
    targetAudience: String,
    requiredFeatures: [String],
    referenceWebsites: [String],
    preferredTechnologies: [String],
    budget: String,
    deadline: Date,
    priority: { type: String, enum: ["low", "normal", "high", "urgent"], default: "normal" },
    additionalNotes: String,
    status: {
      type: String,
      enum: [
        "pending",
        "review",
        "approved",
        "development",
        "testing",
        "completed",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },
    progressPct: { type: Number, default: 0, min: 0, max: 100 },
    assignedManager: { type: Types.ObjectId, ref: "User" },
    assignedDevelopers: [{ type: Types.ObjectId, ref: "User" }],
    estimatedDelivery: Date,
    milestones: [
      {
        title: String,
        dueDate: Date,
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

const projectFileSchema = new Schema(
  {
    project: { type: Types.ObjectId, ref: "Project", required: true, index: true },
    uploadedBy: { type: Types.ObjectId, required: true },
    kind: { type: String, enum: ["file", "image", "video", "pdf", "doc"], default: "file" },
    url: String,
    filename: String,
    size: Number,
    mimeType: String,
  },
  { timestamps: true },
);

const projectMessageSchema = new Schema(
  {
    project: { type: Types.ObjectId, ref: "Project", required: true, index: true },
    sender: { type: Types.ObjectId, required: true },
    senderKind: { type: String, enum: ["client", "team"], required: true },
    body: String,
    attachments: [{ url: String, filename: String, mimeType: String }],
    readByClient: { type: Boolean, default: false },
    readByTeam: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const projectActivitySchema = new Schema(
  {
    project: { type: Types.ObjectId, ref: "Project", required: true, index: true },
    actor: { type: Types.ObjectId },
    kind: String, // "created", "status_changed", "file_uploaded", etc.
    meta: Schema.Types.Mixed,
  },
  { timestamps: true },
);

const projectNoteSchema = new Schema(
  {
    project: { type: Types.ObjectId, ref: "Project", required: true, index: true },
    author: { type: Types.ObjectId, required: true },
    body: String,
    internal: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const projectMeetingSchema = new Schema(
  {
    project: { type: Types.ObjectId, ref: "Project", required: true, index: true },
    title: String,
    scheduledAt: Date,
    durationMinutes: { type: Number, default: 30 },
    joinUrl: String,
    status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  },
  { timestamps: true },
);

const notificationSchema = new Schema(
  {
    client: { type: Types.ObjectId, ref: "Client", required: true, index: true },
    kind: String,
    title: String,
    body: String,
    link: String,
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

const invoiceSchema = new Schema(
  {
    invoiceNumber: { type: String, unique: true, index: true },
    client: { type: Types.ObjectId, ref: "Client", required: true, index: true },
    project: { type: Types.ObjectId, ref: "Project" },
    amount: Number,
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["draft", "sent", "paid", "overdue", "void"], default: "draft" },
    dueDate: Date,
    pdfUrl: String,
  },
  { timestamps: true },
);

const paymentSchema = new Schema(
  {
    client: { type: Types.ObjectId, ref: "Client", required: true, index: true },
    invoice: { type: Types.ObjectId, ref: "Invoice", index: true },
    amount: Number,
    currency: { type: String, default: "INR" },
    provider: String, // "razorpay", "stripe", "manual"
    providerRef: String,
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Project = model("Project", projectSchema);
export const ProjectFile = model("ProjectFile", projectFileSchema);
export const ProjectMessage = model("ProjectMessage", projectMessageSchema);
export const ProjectActivity = model("ProjectActivity", projectActivitySchema);
export const ProjectNote = model("ProjectNote", projectNoteSchema);
export const ProjectMeeting = model("ProjectMeeting", projectMeetingSchema);
export const Notification = model("Notification", notificationSchema);
export const Invoice = model("Invoice", invoiceSchema);
export const Payment = model("Payment", paymentSchema);
