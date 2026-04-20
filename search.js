import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./Router/router.js";
import authentic from "./authorize/auth.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());



app.use("/user",router);
app.get("/",(req,res)=>{
    res.send("success")
})

let port  =process.env.PORT||8080;

app.listen(port,()=>{
    console.log("server connect");
})