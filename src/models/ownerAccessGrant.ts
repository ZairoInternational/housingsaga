import mongoose, { Schema, type Types } from "mongoose";

export interface OwnerAccessGrantDocument {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  tokenHash: string;
  pinHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  failedAttempts: number;
  lockedUntil: Date | null;
  lastAuthenticatedAt: Date | null;
  /** True until the owner replaces the emailed temporary PIN. */
  mustSetPin: boolean;
}

const OwnerAccessGrantSchema = new Schema<OwnerAccessGrantDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "HousingUsers",
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    pinHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
    failedAttempts: {
      type: Number,
      required: true,
      default: 0,
    },
    lockedUntil: {
      type: Date,
      default: null,
    },
    lastAuthenticatedAt: {
      type: Date,
      default: null,
    },
    mustSetPin: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

delete (mongoose.models as Record<string, unknown>).OwnerAccessGrant;

export const OwnerAccessGrant = mongoose.model<OwnerAccessGrantDocument>(
  "OwnerAccessGrant",
  OwnerAccessGrantSchema,
);
