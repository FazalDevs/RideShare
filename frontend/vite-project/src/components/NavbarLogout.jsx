import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function NavbarLogout() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        // Add your logout logic here (e.g., clearing tokens, redirecting, etc.)
        const response = await axios.get('http://localhost:4005/user/logout', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        localStorage.removeItem('jwt')
        console.log('Logout button clicked');
        navigate('/')
    };

    return (
        <nav className="bg-white shadow-md w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-extrabold text-blue-800">RideShare</h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-6">
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
                </div>
            </div>
        </nav>
    );
}
