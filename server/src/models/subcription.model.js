import mongoose, { Schema } from "mongoose";

const subcriptionSchema = new Schema(
  {
    subscriber: { //one who is subcribing
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

export const Subscription = mongoose.model("Subscription", subcriptionSchema);
