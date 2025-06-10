import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommendedUsers, getMyFriends } from '../controllers/user.controller.js';
import {sendFriendRequest} from "../controllers/user.controller.js";

const router = express.Router();
// applies the protectRoute middleware to all routes in this router
router.use(protectRoute);
router.get("/" , getRecommendedUsers);
router.get("/friends" , getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);



export default router ;
