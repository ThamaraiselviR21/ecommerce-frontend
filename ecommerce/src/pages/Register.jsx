import  { useState } from 'react';
import { registerUser } from '../api/userapi';
import { motion } from 'framer-motion';
import { useNavigate} from 'react-router-dom';
const Register = ({ onOtpSent }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', contact: '', role: 'user' });
    const navigate = useNavigate();  

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            alert(response.data.message);
            onOtpSent(response.data.token);
            navigate('/verify-otp'); 
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    

    return (
        // <div className='reg'>
        //    <form onSubmit={handleSubmit}>
        //         <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        //         <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        //         <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        //         <input type="text" name="contact" placeholder="Contact" required onChange={handleChange} />
        //         <input type='text' name='location' placeholder='Location' required/>
        //        <button type="submit">Register</button>
        //    </form>
        // </div>

       <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="flex justify-center items-center min-h-screen bg-gray-900"
        >
            <form 
                onSubmit={handleSubmit} 
                className="bg-gray-800 p-8 rounded-2xl shadow-xl mx-2 w-full max-w-md border-2 border-pink-500 transition-all hover:shadow-pink-400"
            >
                <h2 className="text-white text-2xl font-bold text-center mb-6">Register</h2>
                <div className="space-y-4">
                    {['name', 'email', 'password', 'contact', 'location'].map((field) => (
                        <input 
                            key={field}
                            type={field === 'password' ? 'password' : 'text'}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-pink-500 transition-all"
                        />
                    ))}
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-all"
                    >
                        Register
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default Register;

