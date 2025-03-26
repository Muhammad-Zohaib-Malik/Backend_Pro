import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const subscribeAndUnsubscribe = asyncHandler(async (req, res) => {
  const { channelName } = req.params; 
  const userId = req.user._id; 

  const channel = await User.findOne({ username: channelName.toLowerCase() });

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  if (userId.toString() === channel._id.toString()) {
    throw new ApiError(400, "You cannot subscribe to your own channel.");
  }

  const existingSubscription = await Subscription.findOne({
    subscriber: userId,
    channel: channel._id,
  });

  if (existingSubscription) {
    await Subscription.deleteOne({ _id: existingSubscription._id });
    return res.status(200).json(new ApiResponse(200, { isSubscribed: false, message: `Unsubscribed from ${channelName} successfully` }));
  } else {
    const newSubscription = new Subscription({
      subscriber: userId,
      channel: channel._id,
    });

    await newSubscription.save();
    return res.status(201).json(new ApiResponse(201, { isSubscribed: true, message: `Subscribed to ${channelName} successfully` }));
  }
});
