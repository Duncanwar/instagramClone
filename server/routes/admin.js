import express from "express";
import AdminController from "../controllers/admin.controller";
import adminMiddleware from "../middleware/admin.middleware";
import Admin from "../models/admin"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const router = express.Router();

const {checkPassword,checkUsername} = adminMiddleware
const {createAdmin, getAll} = AdminController

router.post('/admin', [checkUsername], createAdmin )

router.post('/admin/login',[checkPassword,checkUsername],(req,res)=>{
    const {username,password}= req.body;
    if(!username || !password){
    return res.status(422).json({error:"please add username or password"})
    }
    Admin.findOne({username:username})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid username or password"})     
        }
            const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET);
            const {_id,username} = savedUser
       return res.json({token,user:{_id,username},message:"successfully signed in"})
    })
    .catch(err=>{
        console.log(err);
})
    })
router.get('/admin',[checkPassword,checkUsername],getAll);

module.exports = router;