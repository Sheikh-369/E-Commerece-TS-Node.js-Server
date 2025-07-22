import { Request, Response } from "express";
import User from "../database/models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendOPT } from "../services/sendOTP";
import sendMail from "../services/sendMail";

class UserControler{

    //**********USER REGISTER LOGIC***********************
    static async userRegister(req:Request,res:Response){
        const {userName,userEmail,userPassword}=req.body

        //confirming that the user does not leave fields empty
        if(!userName || !userEmail || !userPassword){
            res.status(400).json({
                message:"Please fill all the fields!"
            })
            return
        }

        //checking if the email eneterd by the user is already registered
        const [data] =  await User.findAll({
            where : {
                userEmail : userEmail
            }
        })
        if(data){
             res.status(400).json({
                message : "Email Already Registered!"
            })
            return
        }

        //user registration concept
        await User.create({
            userName, 
            userEmail, 
            userPassword : bcrypt.hashSync(userPassword,10) 
    
        })
        res.status(201).json({
            message:"User Created Successfully!"
        })
    }

    //**********USER LOGIN LOGIC************
    static async userLogin(req:Request,res:Response){
        const {userEmail,userPassword}=req.body

        if(!userEmail || !userPassword){
            res.status(400).json({
                message:"Please fill all the fields!"
            })
            return
        }

        const data=await User.findAll({
            where:{userEmail:userEmail}
        })
        if(data.length===0){
            res.status(400).json({
                message:"Email Not Registered!"
            })
            return
        }

        const isPasswordMatching=bcrypt.compareSync(userPassword,data[0].userPassword)
        if(!isPasswordMatching){
            res.status(400).json({
                message:"Invalid Email or Password!"
            })
            return
        }

        const token=jwt.sign({id:data[0].id},process.env.JWT_SECRET!,{expiresIn:"30d"})
        res.status(200).json({
            message:"User Login Successful!",
            token:token
        })
    }

    //**************FORGOT PASSWORD LOGIC******************
    static async forgotPassword(req:Request,res:Response){
        const {userEmail}=req.body
        if(!userEmail){
            res.status(400).json({
                message:"Please provide Email!"
            })
            return
        }

        const user=await User.findOne({
            where:{userEmail:userEmail}
        })
        if(!user){
            res.status(400).json({
                message:"Email Not Registered!"
            })
            return
        }

        const OTP=sendOPT()
        sendMail({
            to:userEmail,
            subject:"Password Reset Request",
            html:`<div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #ffffff;">
            <h2 style="color: #333;">Password Reset OTP</h2>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) to reset your password is:</p>
            <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; color: #007bff;">${OTP}</div>
            <p>This code is valid for the next 10 minutes. Please do not share it with anyone.</p>
            <p>If you did not request this, you can safely ignore this email.</p>
            <p style="font-size: 12px; color: #777;">Thanks,<br>The Support Team</p>
        </div>`
        })

        user.OTP = OTP.toString()
        user.OTPGeneratedTime = new Date(new Date().getTime())
        user.OTPExpiry=new Date(new Date().getTime()+600000)
        await user.save()

        res.json({
            message:"If the email is registered, an OTP was sent to your Email."
        })
    }

    //***************RESET PASWORD LOGIC********************
    static async resetPassword(req: Request, res: Response) {
    const { userEmail, OTP, newPassword } = req.body;

    if (!userEmail || !OTP || !newPassword) {
        return res.status(400).json({
            message: "Please provide Email, OTP, and new password."
        });
    }

    const [user] = await User.findAll({ where: { userEmail } });

    if (!user) {
        return res.status(400).json({
            message: "Invalid Email or OTP."
        });
    }

    // Check if OTP is expired
    if (!user.OTP || !user.OTPExpiry || new Date() > new Date(user.OTPExpiry)) {
        return res.status(400).json({
            message: "OTP has expired. Please request a new one."
        });
    }

    // OPTIONAL: If you hashed the OTP, use bcrypt.compareSync here instead
    if (user.OTP !== OTP.toString()) {
        return res.status(400).json({
            message: "Invalid OTP."
        });
    }

    // Hash the new password and save
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.userPassword = hashedPassword;

    // Clear OTP fields
    user.OTP = null;
    user.OTPGeneratedTime = null;
    user.OTPExpiry = null;

    await user.save();

    return res.status(200).json({
        message: "Password has been reset successfully."
    });
}

}
export default UserControler