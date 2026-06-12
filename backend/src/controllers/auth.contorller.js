import userModal from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.model.js";

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
}

export async function registerUser(req,res) {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            message: "please provide username , email and password"
        })
    }
    const isUserAlreadyExist = await userModal.findOne({
        $or:[{username},{email}]
    })
    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "account already exists with this email"
        })
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModal.create({
        username, email, password: hash
    })
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

    res.cookie("token", token, cookieOptions)  // ← fixed
    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function loginUser(req,res) {
    const {email, password} = req.body;
    const user = await userModal.findOne({email});
    if(!user){
        return res.status(400).json({
            message: "invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "invalid email or password"
        })
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

    res.cookie("token", token, cookieOptions)  // ← fixed
    res.status(201).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function logoutUser(req,res) {
    const token = req.cookies.token;
    if(token){
        await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token", cookieOptions)  // ← fixed
    res.status(200).json({
        message: "user logged out successfully"
    })
}

export async function getCurrentUser(req,res) {
    const user = await userModal.findById(req.user.id)
    res.status(200).json({
        message: "user detail fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
