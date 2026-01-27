import jwt from "jsonwebtoken";
import User  from "../model/userModel.js";
import bcrypt from "bcryptjs"
import { verifyMail } from "../emailVerify/verifyMail.js";
import { Session } from "../model/sessionModel.js";
import { sendOtpMail } from "../emailVerify/sendOtpMail.js";    

const registerUser = async (req, res) => {
    try
    {
        const {username, email, password} = req.body;

        if (!username || !email || !password)
        {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        const existingUSer = await User.findOne({email})  
        if(existingUSer)
        {
            return res.status(400).json({
                success : false,
                message : "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            username : username,
            email : email,
            password : hashedPassword
        })

        const token = jwt.sign(
            {
                id : newUser._id
            },
            process.env.SECRET_KEY,
            {
                expiresIn : "10m"
           }
        );

        verifyMail(token,email);

        newUser.token = token;

        await newUser.save();

        return res.status(201).json({
            success : true,
            message : "User registered successfully",
            data : newUser,
        })  

    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })

    }
}

const verification = async (req,res) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer "))
        {
            return res.status(401).json({
                success : false,
                message : "Authorization token is missing or invalid"
            })
        }

        const token = authHeader.split(" ")[1]

        let decoded;

        try{
            decoded = jwt.verify(token,process.env.SECRET_KEY)
        }catch(err){
            if(err.name === "TokenExpiredError"){
                return res.status(400).json({
                    success : false,
                    message : "The registration token is expired"
                })
            }
            return res.status(400).json({
                success : false,
                message : "Token Verification failed"
            })
        }

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        user.token = null;
        user.isVerified = true;
        await user.save();

        return res.status(200).json({
            success : true,
            message : "Email verified successfully"
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


const loginUser = async (req,res) => {
    try{
        const {email,password} =req.body;
        // Checking whether the user filled all required fields
        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
        
        // Checking whether the user exists in database
        const user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized access"
            })
        }

        // Chekcing the password
        const passwordCheck = await bcrypt.compare(password, user.password);

        if(!passwordCheck){
            return res.status(401).json({
                success : false,
                message : "Incorrect password"
            })
        }

        //Checking if user is verified
        if(!user.isVerified){
            return res.status(403).json({
                success :false,
                message : "Please verify your account first"
            })
        }

        //check for existing session and delete it 

        const existingSession = await Session.findOne({userId : user._id});

        if(existingSession){
            await Session.deleteOne({userId : user._id})
        }

        // creating a new session for login
        await Session.create({userId : user._id});

        //Generating tokens (Access and Refresh Tokens)

        const accessToken = await jwt.sign({id : user._id}, process.env.SECRET_KEY, {expiresIn : "10d"})
        const refreshToken = await jwt.sign({id : user._id}, process.env.SECRET_KEY, {expiresIn : "30d"})

        // changing the states and saving the user

        user.isLoggedIn = true;
        await user.save();

        return res.status(200).json({
            success : true,
            message : `Welcome back ${user.username}`,
            accessToken,
            refreshToken,
            user
        })


    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })      

    }

}


const logoutUser = async (req, res) => {
    try {
        const userId = req.userId;
        await Session.deleteMany({ userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false })
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000)

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save()
        await sendOtpMail(email, otp);
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const verifyOtp = async (req, res) => {
    try {
        const {otp} = req.body
        const email = req.params.email
        // 1️⃣ Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 2️⃣ Check if OTP exists
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "No OTP requested for this user"
            });
        }

        // 3️⃣ Match OTP
        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // 4️⃣ Check expiry
        if (new Date() > user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired, request a new one"
            });
        }

        // 5️⃣ OTP verified → clear OTP to prevent reuse
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        // 6️⃣ Send response: OTP verified
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully, you can now reset your password"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const changePassword = async (req, res)=>{
    const {newPassword, confirmPassword} = req.body
    const email = req.params.email
    
    if(!newPassword || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    if(newPassword !== confirmPassword) {
        return res.status(400).json({
            success:false,
            message:"Password do not match"
        })
    }

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        return res.status(200).json({
            success:true,
            message:"Password changed successsfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export { registerUser, verification, loginUser, logoutUser, forgotPassword , verifyOtp,changePassword}