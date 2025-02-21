import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:4005/user/login',
                { email, password },
                { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
            );

            localStorage.setItem('jwt', response.data.token);
            toast.success('Logged in successfully 🎉');
            setEmail('');
            setPassword('');
            navigate('/listing');
        } catch (error) {
            toast.error('Invalid credentials! Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200">
                    <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        Please login to continue
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                autoComplete='username'
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                autoComplete="current-password"
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Sign Up Redirect */}
                    <p className="text-sm text-center mt-4 text-gray-600">
                        Don't have an account?
                        <a href="/register" className="text-blue-500 hover:underline ml-1">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
