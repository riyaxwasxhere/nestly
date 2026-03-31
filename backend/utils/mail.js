import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const sendResetEmail = async (email,otp) => {
    try{
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`
        }
        await transporter.sendMail(mailOptions)
        console.log("Reset email sent successfully")
    }catch(error){
        console.error("Error sending reset email:", error)
        throw new Error("Failed to send reset email")
    }
}