import express from "express";
import mailSender from "../utils/mailSender.js";
import mailsendercontroller from "../controllers/mail.js";
const router = express.Router();

router.post("/sendmail", mailsendercontroller);

export default router;
