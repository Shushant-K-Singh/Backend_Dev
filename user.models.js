import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js"
import dotenv from "dotenv";
import { StatusCodes } from "http-status-pro-js";

dotenv.config();


export async function createUser(req,res){
    let{name,email,password} =req.body;

    try{
         const data =  await User.findOne({email})
         if(data){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
         }
        let pass = bcrypt.hashSync(password,10);
        password = pass;
        let obj = new User ({name,email,password});
        await obj.save()
           return res.status(StatusCodes.CREATED.code).json({
                code:StatusCodes.CREATED.code,
                message:StatusCodes.CREATED.message,
                data:null
            })
    }catch(err){
        console.log("create ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}


// login

const otpStore = new Map();

export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message: "User not found",
                data: null
            });
        }

        const comPass = bcrypt.compareSync(password, user.password);
        if (!comPass) {
            return res.status(StatusCodes.UNAUTHORIZED.code).json({
                code: StatusCodes.UNAUTHORIZED.code,
                message: "Invalid password",
                data: null
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const userId = user._id.toString();

        otpStore.set(userId, otp);
        setTimeout(() => otpStore.delete(userId), 300000);

        console.log(`OTP for ${email}: ${otp}`);

        return res.status(StatusCodes.OK.code).json({
            code: StatusCodes.OK.code,
            message: "OTP generated successfully",
            data: { userId }
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}

export async function verifyLogin(req, res) {
    try {
        const { userId, otp } = req.body;
        const savedOtp = otpStore.get(userId);

        if (!savedOtp || otp !== savedOtp) {
            return res.status(StatusCodes.UNAUTHORIZED.code).json({
                code: StatusCodes.UNAUTHORIZED.code,
                message: "Invalid or expired OTP",
                data: null
            });
        }

        otpStore.delete(userId);

        const token = jwt.sign({ id: userId }, process.env.TOKEN, { expiresIn: "7d" });

        return res.status(StatusCodes.OK.code).json({
            code: StatusCodes.OK.code,
            message: "Login successful",
            data: { token }
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}