
import mongoose, { Schema } from 'mongoose'

const likeAndDislikeSchema=new Schema({
    video:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Video"
    },
    likedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    disLikedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }

},{timestamps:true})

export const LikeAndDisLike=mongoose.model('LikeAndDisLike',likeAndDislikeSchema)