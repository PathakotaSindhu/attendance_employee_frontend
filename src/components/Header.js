//import React, { useState } from 'react';
import axios from 'axios';

/*const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/verify-email', { email });
            if (response.data === 'Email exists') {
                setEmailVerified(true);
                setError('');
            } else {
                setError('Email not found');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
                email,
                newPassword
            });
            setMessage(response.data);
            setError('');
        } catch (err) {
            setError('Error resetting password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

                {!emailVerified ? (
                    <form onSubmit={handleVerifyEmail}>
                        <label className="block mb-2 font-medium text-gray-700">Enter your email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded-lg"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 mt-4 rounded-lg"
                        >
                            Verify Email
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <label className="block mb-2 font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded-lg mb-2"
                        />

                        <label className="block mb-2 font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded-lg"
                        />

                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white p-2 mt-4 rounded-lg"
                        >
                            Reset Password
                        </button>
                    </form>
                )}

                {message && <p className="text-green-500 mt-2">{message}</p>}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;*/
import React from 'react';
import logo from './nictlogo.jpg'; // Replace with the actual logo path

const Header = () => {
    return (
        <div className="bg-gradient-to-br from-teal-100 via-pink-50 to-lime-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                {/* Logo */}
                <img src={logo} alt="NICT Logo" className="w-30 h-20 object-contain" />

                {/* Heading */}
                <h1 className="text-2xl font-semibold text-teal-700 mx-auto">
                    NICT COMPUTER EDUCATION
                </h1>
            </div>
        </div>
    );
};

export default Header;

