import { Router } from "express";
import MessagesController from "../controller/messagesController";
import { validateJWT } from "./../middlewares/jtwvalidator";

const router = Router();

router.get("/", validateJWT, MessagesController.getMessages);

export default router;
