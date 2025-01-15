import expressAsyncHandler from 'express-async-handler'
import userSchema from '../models/user_model.js';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticate from '../middleware/authenticator.js';

const userRouter = express.Router();


userRouter.post("/register", expressAsyncHandler(async (req, res) =>{
    const {name, email, password} = req.body;

    const existingUser = await userSchema.findOne({email});
    if(existingUser){
        res.status(400).send("User already exists")
    }
    
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userSchema({name, email, password: hashedPassword})
        await newUser.save()
        
        res.status(200).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            createdAt: newUser.createdAt
        })
    }catch(err){
        res.status(500).send("Error registering user")
    }

}))

userRouter.post("/login", expressAsyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    console.log(email, " ", password)
    const user = await userSchema.findOne({email});
    // if(!user){
    //     res.status(400).json({error: "User not found"})
    // }
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword || !user){
        res.status(400).json({error: "invalid credential"})
    }else{
        const token = jwt.sign({
            id: user.id,
        }, process.env.JWTSECRET, {
            expiresIn: '7d'
        })

        res.status(200).send({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token,
            createdAt: user.createdAt,
        })
    }

}))


userRouter.get("/profile", authenticate, expressAsyncHandler(async (req, res) => {
    const user = await userSchema.findById(req.user.id)
    if(!user){
        res.status(404);
        throw new Error("user not found");
    }
    res.send({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
    })
}))

export default userRouter