import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function NavbarLogout() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        // Add your logout logic here (e.g., clearing tokens, redirecting, etc.)
        const response = await axios.get('https://rideshare-backend-eg6m.onrender.com/user/logout', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        localStorage.removeItem('jwt');
        toast.success('Logged out successfully');
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-extrabold text-blue-800">
                            RideShare
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6">
                        <a
                            href="/listing"
                            className="text-blue-800 hover:text-blue-600 px-4 py-2 rounded-md text-base font-medium"
                        >
                            Join a Carpool
                        </a>
                        <a
                            href="/carpoolForm"
                            className="text-blue-800 hover:text-blue-600 px-4 py-2 rounded-md text-base font-medium"
                        >
                            Create a Carpool
                        </a>
                        <a
                            href="/listing/mycarpool"
                            className="text-blue-800 hover:text-blue-600 px-4 py-2 rounded-md text-base font-medium"
                        >
                            My Carpool
                        </a>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-blue-800 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <a
                        href="/listing"
                        className="block px-4 py-2 text-blue-800 hover:bg-gray-100"
                    >
                        Join a Carpool
                    </a>
                    <a
                        href="/carpoolForm"
                        className="block px-4 py-2 text-blue-800 hover:bg-gray-100"
                    >
                        Create a Carpool
                    </a>
                    <a
                        href="/listing/mycarpool"
                        className="block px-4 py-2 text-blue-800 hover:bg-gray-100"
                    >
                        My Carpool
                    </a>
                    <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 bg-red-500 text-white text-center hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
