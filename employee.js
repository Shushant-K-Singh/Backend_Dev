import Joi from "joi";
import { StatusCodes } from "http-status-pro-js";

function addmid(req,res,next){
    try{
        let schema = Joi.object({
            Name:Joi.string().trim().min(3).max(200).lowercase().required(),
            email:Joi.string().trim().email().min(12).max(200).lowercase().required(),
            mob:Joi.string().min(10).max(12).required(),
            gender:Joi.string().min(4).max(10).required(),
            department:Joi.string().trim().min(2).max(200).required(),
            salary:Joi.number().positive().required(),
            notes: Joi.string().trim().lowercase(),
            image:Joi.required()
        })

        const{error,value} = schema.validate(req.body);
        if(error){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:error.message,
                data:null
            })
        }
        req.body = value;
        next();
    }catch(err){
        console.log("create mid ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}
export default addmid;