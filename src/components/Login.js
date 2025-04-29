/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // Can be email or username
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loginResponse, setLoginResponse] = useState(null);

    useEffect(() => {
        if (loginResponse) {
            console.log("Role from backend:", loginResponse.role);

            if (loginResponse.role.toUpperCase() === 'ADMIN') {
                navigate('/admin-dashboard');
            } else {
                navigate('/qr-scanner');
            }
        }
    }, [loginResponse, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                identifier, // Can be email or username
                password
            });

            const data = response.data;
            const token = data.token.split(' ')[1];

            localStorage.setItem('token', token);
            localStorage.setItem('id', data.id);
            localStorage.setItem('role', data.role);

            console.log("User ID:", data.id);
            console.log("Token:", token);
            console.log("Role:", data.role);

            setLoginResponse(data);
        } catch (err) {
            console.error("Login error:", err);
            setError('Invalid login credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100">
            <div className="bg-white shadow-lg rounded-3xl p-8 max-w-sm w-full text-center transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Email or Username</label>
                        <input 
                            type="text" 
                            value={identifier} 
                            onChange={(e) => setIdentifier(e.target.value)} 
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300 transform hover:-translate-y-1"
                    >
                        Login
                    </button>
                    {error && (
                        <p className="text-center text-red-500 mt-3 font-medium">
                            {error}
                        </p>
                    )}
                </form>
                <p className="text-gray-500 mt-4 text-sm">
                    <a href="/forgotpassword" className="text-blue-500 hover:underline">Forgot Password?</a>
                </p>
                <p className="text-gray-500 mt-4 text-sm">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;*/

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username: identifier,
                password
            });

            console.log("🧪 Full response.data:", response.data);

            const { token, message } = response.data;

            if (!token) {
                console.log("📣 Message:", message || "Invalid email/username or password");
                setError(message || "Login failed. Please check your credentials.");
                return;
            }

            const decoded = jwtDecode(token);
            console.log("✅ Decoded JWT:", decoded);

            // Check token expiration
            const now = Date.now() / 1000;
            if (decoded.exp < now) {
                console.log("⚠️ Token expired.");
                setError("Session expired. Please login again.");
                return;
            }

            // Save token to local storage
            localStorage.setItem("token", token);

            // Navigate based on role
            if (decoded.sub === "Admin") {
                setSuccess("Login successful! Navigating to Admin Dashboard...");
                navigate("/admin/dashboard");
            } else {
                setSuccess("Login successful! Navigating to User Dashboard...");
                navigate("/user-dashboard");
            }

        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;*/
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username: identifier,
                password
            });

            const { token, message } = response.data;

            if (!token) {
                setError(message || "Login failed. Please check your credentials.");
                return;
            }

            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            if (decoded.exp < now) {
                setError("Session expired. Please login again.");
                return;
            }

            localStorage.setItem("token", token);

            if (decoded.sub === "Admin") {
                setSuccess("Login successful! Navigating to Admin Dashboard...");
                navigate("/admin/dashboard");
            } else {
                setSuccess("Login successful! Navigating to User Dashboard...");
                navigate("/user-dashboard");
            }

        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login</h2>

                {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-sm text-center">{success}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-1 font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <Link to="/forgotpassword" className="text-sm text-indigo-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

