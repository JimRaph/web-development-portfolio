import { User } from "../models/userModel.js";
import { sendVerificationCode, verifyCode } from "../utils/regAuth.js";
import { tokenGenerator } from "../utils/token.js";


export const register = async (req, res) => {
  try {
    const { Phone } = req.body;

    if (!Phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(Phone)) {
      return res.status(400).json({ message: "Phone number must contain only digits" });
    }

    // ensures phone number is unique
    const existingUser = await User.findOne({ Phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    const response = await sendVerificationCode(Phone);

    if (!response.success) {
      console.log('ERROR SENDING VERIFICATION CODE')
      return res.status(500).json({ message: 'Error sending verification code'});
    }

    // creates user
    const user = await User.create({
      Phone,
      verificationCode: response.otp,
    });

    if(user){
      console.log('USER CREATED: ', user)
      return res.status(201).json({
        message: "OTP sent to your Phone number",
        userId: user._id,
        otp: response.otp,
        success: true
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Error registering user", error: error.message });
  }
};


export const verifyPhone = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      console.log( "PHONE AND OTP REQUIRED" )
      return res.status(400).json({ message: "User ID and Phone are required" });
    }

    const otpRegex = /^\d+$/;
    if (!otpRegex.test(otp)) {
      return res.status(400).json({ message: "otp must only be digits" });
    }

    // finds user by id
    const user = await User.findOne({Phone: phone});
    if (!user) {
      console.log( "USER DOES NOT EXIST" )
      return res.status(404).json({ message: "User not found" });
    }

    // checks if user has a verification request ID
    if (!user.verificationCode) {
      console.log( "NO PENDING VERIFICATION" )
      return res.status(400).json({ message: "No pending verification request" });
    }

    // verify OTP with Vonage
    const response = await verifyCode(user.verificationCode, otp);
    console.log(user.verificationCode, otp)
    console.log(response)
    if (!response) {
      console.log( "INCORRECT OTP" )
      return res.status(401).json({ message: "incorrect otp" });
    }

    // updates user status
    user.isVerified = true;
    // user.verificationCode = null;
    await user.save();

    // generates JWT token
    const token = tokenGenerator(user._id);

    return res.status(200).json({
      message: "User verified successfully",
      success: true,
      token,
      user: user
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({ message: "Error verifying user", error: error.message });
  }
};
