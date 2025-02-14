import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import Navbar from './Navbar';
const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:4005/user/login', {
                email: email, password: password
            },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            await localStorage.setItem("jwt", response.data.token)
            console.log(response.data.token)
            setemail("")
            setPassword("")
            navigate('/listing');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Log In</h1>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        Welcome back! Please login to your account.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => { setemail(e.target.value) }}
                                placeholder="you@example.com"
                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder="********"
                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-blue-500 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
