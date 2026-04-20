import Joi from "joi";
import { StatusCodes } from "http-status-pro-js";

function deletemid(req,res,next){
    try{
        let schema = Joi.object({
            id:Joi.number().required()
        })
        const{error,value} = schema.validate(req.user);
   if(error){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:error
            })
        }
        req.user = value;
        next();
    }catch(err){
        console.log("delete mid ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}
export default deletemid;