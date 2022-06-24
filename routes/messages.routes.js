import { Router } from "express";
import messagecontroller from "../controllers/message-controller.js";

const router = Router();

router.post("/writeMessage", messagecontroller.writemessage);

router.get("/getMessages", messagecontroller.getMessages);

router.post("/deleteMessage", messagecontroller.deleteMessage);

export default router;
