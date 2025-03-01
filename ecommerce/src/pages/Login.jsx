import { useState } from 'react';
import { loginUser } from '../api/userapi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ onLogin = () => {} }) => {  // ✅ Fix: Default function to prevent errors
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage(''); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            setErrorMessage('Both email and password are required.');
            return;
        }

        setLoading(true);
        try {
            const response = await loginUser(formData);
            console.log("🔍 Full API Response:", response); // Debugging

            // Ensure response contains expected data
            if (response.data && response.data.token) {
                alert(response.data.message); 
                localStorage.setItem('token', response.data.token);
                onLogin(response.data.token);  // ✅ Fix: Call `onLogin` properly
                navigate('/home'); // ✅ Navigate after success
            } else {
                console.log("❌ Unexpected response format:", response.data);
                setErrorMessage(response.data.message || "Invalid response format.");
            }
        } catch (error) {
            console.error("❌ Login Error:", error); // Show error details
            setErrorMessage(error.response?.data?.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        // <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
        //     <h2>Login</h2>
        //     {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        //     <div>
        //         <input
        //             type="email"
        //             name="email"
        //             placeholder="Email"
        //             value={formData.email}
        //             onChange={handleChange}
        //             required
        //             style={{ margin: '8px 0', padding: '10px', width: '100%' }}
        //         />
        //     </div>
        //     <div>
        //         <input
        //             type="password"
        //             name="password"
        //             placeholder="Password"
        //             value={formData.password}
        //             onChange={handleChange}
        //             required
        //             style={{ margin: '8px 0', padding: '10px', width: '100%' }}
        //         />
        //     </div>

        //     <button
        //         type="submit"
        //         disabled={loading}
        //         style={{
        //             padding: '10px 20px',
        //             backgroundColor: loading ? '#ccc' : '#007bff',
        //             color: '#fff',
        //             border: 'none',
        //             cursor: loading ? 'not-allowed' : 'pointer',
        //         }}
        //     >
        //         {loading ? 'Logging in...' : 'Login'}
        //     </button>
        //     <button>create account</button>
        // </form>
        <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="flex justify-center items-center min-h-screen bg-gray-900"
    >
        <form 
            onSubmit={handleSubmit} 
            className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border-2 border-pink-500 transition-all hover:shadow-pink-400"
        >
            <h2 className="text-white text-2xl font-bold text-center mb-6">Login</h2>
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            <div className="space-y-4">
                {['email', 'password'].map((field) => (
                    <input 
                        key={field}
                        type={field === 'password' ? 'password' : 'email'}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        required
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all"
                    />
                ))}
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-all disabled:bg-gray-600"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </motion.button>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => navigate('/register')}
                    className="w-full py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
                >
                    Create Account
                </motion.button>
            </div>
        </form>
    </motion.div>
    );
};

export default Login;
