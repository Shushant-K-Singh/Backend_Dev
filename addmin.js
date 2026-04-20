import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-pro-js";
import dotenv from "dotenv";


dotenv.config();

function authentic(req,res,next){
    try{
        let auth = req.headers.authorization;
        if(!auth || !auth.startsWith("Bearer")){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        let token = auth.split(" ")[1];
        let userData = jwt.verify(token,process.env.TOKEN);
        req.user = userData.id;
        next();
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}
export default authentic;