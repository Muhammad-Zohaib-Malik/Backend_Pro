import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import ffprobePath from "@ffprobe-installer/ffprobe";

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath.path);

const getVideoDuration = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) reject(new ApiError(500, "Error reading video metadata"));
      else resolve(metadata.format.duration);
    });
  });
};

export const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description, category, tags } = req.body;
  const { video, thumbnail } = req.files;

  if (!video || !thumbnail) {
    throw new ApiError(400, "Video and thumbnail are required");
  }

  const videoPath = video[0]?.path;
  const thumbnailPath = thumbnail[0]?.path;

  try {
    const duration = await getVideoDuration(videoPath);

    const videoUpload = await uploadOnCloudinary(videoPath, {
      resource_type: "video",
      folder: "Backend/Videos",
    });

    const thumbnailUpload = await uploadOnCloudinary(thumbnailPath, {
      resource_type: "image",
      folder: "Backend/Thumbnails",
    });

    const newVideo = new Video({
      title,
      description,
      category,
      tags,
      duration,
      videoUrl: videoUpload.secure_url,
      videoId: videoUpload.public_id,
      thumbnailUrl: thumbnailUpload.secure_url,
      thumbnailId: thumbnailUpload.public_id,
    });

    await newVideo.save();

    res
      .status(201)
      .json(new ApiResponse(201, newVideo, "Video Uploaded Successfully"));
  } catch (error) {
    console.error("Upload Error:", error);

    throw new ApiError(500, "Failed to upload video");
  }
});
