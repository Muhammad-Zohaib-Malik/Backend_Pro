import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { uploadVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

//secure routes
router.route("/upload").post(verifyJwt,upload.fields([{
  name:"video",maxCount:1
},{
  name:"thumbnail",maxCount:1}]), uploadVideo);

export default router;
