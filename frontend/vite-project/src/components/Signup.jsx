import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
function SignupPage() {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4005/user/register", {
                username: username,
                email: email,
                password: password
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            localStorage.setItem("jwt", response.token)
            // console.log(response)
            navigate("/")
            setusername("")
            setemail("")
            setpassword("")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                    <h1 className="text-xl font-bold text-center mb-4">Sign Up</h1>
                    <form className="space-y-4" onSubmit={handlesubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                value={username}
                                onChange={(e) => { setusername(e.target.value) }}
                                placeholder="John Doe"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => { setemail(e.target.value) }}
                                placeholder="you@example.com"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => { setpassword(e.target.value) }}
                                placeholder="********"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Create Account
                        </button>
                    </form>
                    <p className="text-sm text-center mt-4">
                        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;