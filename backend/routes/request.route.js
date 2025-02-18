import express from "express";
import { requestToJoin, getRequests, updateRequestStatus } from "../controllers/request.controller.js";
import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

router.post("/:carpoolId", authenticate, requestToJoin);
router.get("/:carpoolId", authenticate, getRequests);
router.patch("/:carpoolId/:requestId", authenticate, updateRequestStatus);

export default router;
