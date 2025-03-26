import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { subscribeAndUnsubscribe } from "../controllers/subscription.controller.js";

const router = Router();

//secure routes
router.route("/:channelName").post(verifyJwt, subscribeAndUnsubscribe);

export default router;
