import mongoose, { Schema } from "mongoose";

const subcriptionSchema = new Schema(
  {
    subcriber: { //one who is subcribing
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    channel: { //one to whom subcriber is subcribing
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Video = mongoose.model("Subcription", subcriptionSchema);
