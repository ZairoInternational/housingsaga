import mongoose, { Schema, type Types } from "mongoose";

export interface OwnerAccessSessionDocument {
  _id: Types.ObjectId;
  accessId: Types.ObjectId;
  ownerId: Types.ObjectId;
  sessionHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
}

const OwnerAccessSessionSchema = new Schema<OwnerAccessSessionDocument>(
  {
    accessId: {
      type: Schema.Types.ObjectId,
      ref: "OwnerAccessGrant",
      required: true,
      index: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "HousingUsers",
      required: true,
      index: true,
    },
    sessionHash: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

delete (mongoose.models as Record<string, unknown>).OwnerAccessSession;

export const OwnerAccessSession = mongoose.model<OwnerAccessSessionDocument>(
  "OwnerAccessSession",
  OwnerAccessSessionSchema,
);
