import Joi from "joi";
import { StatusCodes } from "http-status-pro-js";

function updatemid(req,res,next){
    try{
        let schema = Joi.object({
            id:Joi.number().min(1).max(100).required(),
            email:Joi.string().trim().email().min(12).max(200).lowercase().required(),
            mob:Joi.number().min(10).max(12).required(),
            salary:Joi.number().min(1).max(10).required()
        })
        const{error,value} = schema.validate(req.body);
   if(error){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        req.body = value;
        next();
    }catch(err){
        console.log("update mid ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}
export default updatemid;