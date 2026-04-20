import express from "express";
import requestLogger from "../middleaware/requestLogger.middleware.js";
import { createUser, userLogin, verifyLogin } from "../controller/user.controller.js";

const router = express.Router();

router.use(requestLogger);

router.post("/signup",createUser);
router.get("/login",userLogin)
router.get("/otpLogin",verifyLogin)

 
 
export default router;