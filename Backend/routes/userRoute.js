import express from "express";
import { loginUser, registerUser, verification,logoutUser,forgotPassword,verifyOtp,changePassword } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { userSchema, validateUser } from "../validators/userValidate.js"
const router = express.Router();

router.get('/', (req,res) => {
    res.send("User Route is working");
})
router.post('/register',validateUser(userSchema), registerUser)
router.post('/verify', verification)
router.post('/login',loginUser)
router.post('/logout',isAuthenticated, logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp/:email', verifyOtp);
router.post('/change-password/:email', changePassword);


export default router;