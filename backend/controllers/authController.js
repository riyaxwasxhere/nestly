import generateToken from "../utils/token.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendResetEmail } from "../utils/mail.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, role, mobile } = req.body;
    if (!fullname || !email || !password || !role || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      mobile,
      role
    });

    await newUser.save();
    const token = generateToken(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({ message: "Signin successful", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const googleSignup = async (req, res) => {
  try {
    const { fullname, email, role, mobile, password } = req.body;
    if (!fullname || !email || !role || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        fullname,
        email,
        role,
        mobile,
        password: await bcrypt.hash(password, 10)
      });
      await user.save();
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({ message: "Google signup successful", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const googleSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({ message: "Google signin successful", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendResetEmail(email, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.resetOtp) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please request again." });
    }
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Expired OTP" });
    }

    if (user.resetOtp?.toString() !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    user.isOtpVerified = true;
    await user.save();
    console.log("Entered OTP:", otp);
    console.log("Stored OTP:", user.resetOtp);
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.isOtpVerified = false;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
