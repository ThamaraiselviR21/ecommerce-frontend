import  { useState } from 'react';
import { verifyOTP } from '../api/userapi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const VerifyOTP = ({ token, onVerified }) => {
    const navigate=useNavigate();
    const [otp, setOtp] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        console.log("Sending Token:", token); // Debugging
        try {
            const response = await verifyOTP({ otp, token }); // Send token in body
            alert(response.data.message);
            onVerified();
            navigate('/login');
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    
    
    

    return (
       

        <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="flex justify-center items-center min-h-screen bg-gray-900"
    >
        <form 
            onSubmit={handleVerify} 
            className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full mx-2 max-w-md border-2 border-pink-500 transition-all hover:shadow-pink-400"
        >
            <h2 className="text-white text-2xl font-bold text-center mb-6">Verify OTP</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink transition-all"
                    required
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-all disabled:bg-gray-600"
                >Verify
                </motion.button>
            </div>
        </form>
    </motion.div>


    );
};

export default VerifyOTP;
