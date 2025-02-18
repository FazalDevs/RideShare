import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { toast } from "react-hot-toast"; // React Hot Toast for alerts

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4005/user/register",
                { username, email, password },
                { withCredentials: true, headers: { "Content-Type": "application/json" } }
            );

            localStorage.setItem("jwt", response.token);
            toast.success("Account created successfully! 🎉");
            navigate("/");
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (error) {
            toast.error("Signup failed! Please try again.");
            console.log(error);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200">
                    <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                        Create an Account
                    </h1>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="John Doe"
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Login Redirect */}
                    <p className="text-sm text-center mt-4 text-gray-600">
                        Already have an account?
                        <a href="/login" className="text-blue-500 hover:underline ml-1">Log in</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
