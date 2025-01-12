import jwt from 'jsonwebtoken';
import expressAsyncHandler from "express-async-handler";
import userSchema from "../models/user_model.js";
import dotenv from 'dotenv';

// dotenv.config();

const authenticate = expressAsyncHandler( async (req, res, next) => {

    console.log(process.env.JWTSECRET)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWTSECRET);
           
            req.user = await userSchema.findById(decoded.id).select("-password");
            console.log(req.user)
            next();
        }catch(e){
            console.error(e);
            res.status(401).send({message: "Invalid token, Can't access"});
        }
    }
    //res.status(401).send({message: "You are not authorized to access this resource"});
})


export default authenticate;