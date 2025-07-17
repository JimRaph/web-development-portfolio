
function generateOTP(length = 6) {
    const characters = '0123456789'; 
  
    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters[randomIndex];
    }
    return otp;
  }
  

  
export const sendVerificationCode = async (phone) => {
    const otp = generateOTP();
    return { success: true, otp:otp, phone:phone };
}

export const verifyCode = async (otpD, otp) => {
    return otpD == otp;
}