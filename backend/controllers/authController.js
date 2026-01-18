import generateToken from "../middleware/token.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try{
        const { fullname, email, password } = req.body
        if(!fullname || !email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }
        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(400).json({ message: "User already exists" })
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await new User({
            fullname,
            email,
            password: hashedPassword
        })

        await newUser.save()
        const token = generateToken(newUser)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 
        })

        res.status(201).json({ message: "User registered successfully" })
    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = generateToken(user)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 
        })
        res.status(200).json({ message: "Login successful" })
    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const logout = async (req, res) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })
        res.status(200).json({ message: "Logout successful" })
    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}