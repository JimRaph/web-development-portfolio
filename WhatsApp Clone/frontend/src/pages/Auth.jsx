import { useEffect, useState } from 'react';
import { 
  SmartphoneIcon, 
  ChevronRightIcon, 
  Globe, 
  Lock,
  Check
} from 'lucide-react';
import axios from 'axios'
import { base_url } from '../../utils/baseUrl';
import {toast} from 'sonner'

const AuthFlow = ({onAuthenticated}) => {
  // Navigation state replaces react-router
  const [currentView, setCurrentView] = useState(()=>{
    return localStorage.getItem('whatsapp-currentView') || 'phone';
  });
  // State for phone number input
  const [phoneNumber, setPhoneNumber] = useState('');
  // State for selected country code
  const [countryCode, setCountryCode] = useState('+1');
  // State for OTP digits
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationCode, setVerificationCode] = useState()
  const [theme, setTheme] = useState(()=>{
    return localStorage.getItem('theme') || 'Dark'
  })
  const [error, setError] = useState('')


  // Handle phone number submission
  const handlePhoneSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(base_url+'/auth/register', {Phone: phoneNumber} )
      if(response.data.success) {
        setVerificationCode(response.data.otp)
        // localStorage.setItem('phone', phoneNumber)
        setCurrentView('otp');
      }else{
        toast.error(response?.data?.message || 'Something went wrong')
      }
    }catch(err){
      // console.log('eww:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'An error occurred'); 

    }
  };

  // handle OTP digit input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; 
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(base_url+'/auth/verify', 
        {phone: phoneNumber, otp: otp.join('')})
        
        if(data.success){
          localStorage.setItem('whatsapp-token', data.token)
          localStorage.setItem('whatsapp-user', JSON.stringify(data.user));
          localStorage.removeItem('whatsapp-currentView')
          onAuthenticated()
        }else{
          toast.error(data?.message || 'Something went wrong')
        }
    } catch (error) {
      // console.log('eww:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'An error occurred'); 
    }
 
  };

  useEffect(()=>{
    localStorage.setItem('whatsapp-currentView', currentView);
  }, [currentView])


  useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      setError('');
    }, 3000); 

    return () => clearTimeout(timer); 
  }
}, [error]);


  return (
    <div className={`min-h-screen ${theme === 'Dark' ? 'bg-[#202C33]' : 'bg-[#FFFFFF]'} ${theme.textPrimary} flex flex-col`}>
      {/* WhatsApp Header */}
      <header className={`${theme === 'Dark' ? 'bg-[#111B21]' : 'bg-[#F3F3F3]'} p-4 text-center`}>
        <h1 className="text-xl font-semibold text-[#00a884]">WhatsApp</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto px-4">
        {currentView === 'phone' ? (
          /* Phone Number Input Step */
          <div className="w-full">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <SmartphoneIcon size={64} className="text-[#00a884]" />
              </div>
              <h2 className={`${theme=== 'Dark' ? 'text-gray-50' :''} text-2xl font-semibold mb-2`}>Enter your phone number</h2>
              <p className="text-gray-400">
                WhatsApp will send an SMS to verify your phone number.
              </p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              {/* Country Selection  */}
              <div className={`flex items-center space-x-2 p-3 ${theme === 'Dark' ? 'bg-[#394f5e]' : 'bg-[#F3F3F3]'} rounded`}>
                <Globe className="text-[#00a884]" size={20} />
                <select 
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className={`${theme === 'Dark' ? 'bg-[#394f5e] text-gray-50' : 'bg-[#F3F3F3]'} ${theme.textSecondary} border-none outline-none`}
                >
                  <option value="+1">United States (+1)</option>
                  <option value="+44">United Kingdom (+44)</option>
                  <option value="+234">NGN (+234)</option>
                </select>
              </div>

              {/* Phone Number Input */}
              <div className={`flex items-center p-3 ${theme === 'Dark' ? 'bg-[#394f5e] text-gray-50' : 'bg-[#F3F3F3]'} rounded`}>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setPhoneNumber(value)
                  }
                }
                  placeholder="Your phone number"
                  className={`w-full bg-transparent outline-none `}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00a884] text-white py-3 rounded flex items-center justify-center space-x-2"
              >
                <span>Next</span>
                <ChevronRightIcon size={20} />
              </button>
            </form>
            {error && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {error}
              </p>
            )}


            <div className="mt-6 text-center text-sm text-gray-400">
              <Lock size={16} className="inline mr-1" />
              Your data is securely encrypted
            </div>
          </div>
        ) : (
          /* OTP Verification Step */
          <div className="w-full">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Lock size={64} className="text-[#00a884]" />
              </div>
              <h2 className={` ${theme=== 'Dark' ? 'text-gray-50' :''} text-2xl font-semibold mb-2`}>Enter verification code</h2>
              <p className={` ${theme.textSecondary} ${theme=== 'Dark' ? 'text-gray-400' :''} `}>
                We sent a code to {countryCode + phoneNumber}
              </p>
              <p className={` ${theme.textSecondary} ${theme=== 'Dark' ? 'text-gray-400' :''}`}>code: {verificationCode}</p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {/* OTP Input Fields */}
              <div className="flex justify-between mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 1);
                      handleOtpChange(index, value);
                    }}
                    className={`w-12 h-12 text-center ${theme === 'Dark' ? 'bg-[#111B21]' : 'bg-[#F3F3F3]'}
                     rounded-lg mx-1 text-xl ${theme=== 'Dark' ? 'text-gray-50' :''}`}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-[#00a884] text-white py-3 rounded flex items-center justify-center space-x-2"
              >
                <span>Verify</span>
                <Check size={20} />
              </button>
            </form>
            {error && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {error}
              </p>
            )}

            <div className="mt-6 text-center">
              <button 
                onClick={() => setCurrentView('phone')}
                className="text-[#00a884]"
              >
                Wrong number?
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthFlow;