import Joi from "joi";
import { StatusCodes } from "http-status-pro-js";

function searchmid(req,res,next){
    try{
        let schema = Joi.object({
            id:Joi.number().required()
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
        console.log("search mid ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}
export default searchmid;