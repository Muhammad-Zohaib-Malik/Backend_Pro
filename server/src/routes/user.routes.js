import { Router } from "express";
import {
  getUserChannelProfile,
  loginUser,
  LogoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);

//secure routes
router.route("/logout").post(verifyJwt, LogoutUser);
router.route("/refresh-token").post(verifyJwt,refreshAccessToken);
router.route("/c/:username").get(verifyJwt,getUserChannelProfile);


export default router;
