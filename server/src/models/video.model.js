import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true },
    videoId: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    thumbnailId: { type: String, required: true },
    tag: [{ type: String, trim: true }],
    category: { type: String, required: true, trim: true },
    duration: { type: Number, required: true },
    views: { type: Number, default: 0, min: 0 },
    likes: { type: Number, default: 0, min: 0 },
    dislikesCount: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
