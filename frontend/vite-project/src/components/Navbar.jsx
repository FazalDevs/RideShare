import React from 'react';

export default function Navbar() {
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
                            href="carpoolForm"
                            className="text-blue-800 hover:text-blue-600 px-4 py-2 rounded-md text-base font-medium"
                        >
                            Create a Carpool
                        </a>
                        <a
                            href="#my-carpool"
                            className="text-blue-800 hover:text-blue-600 px-4 py-2 rounded-md text-base font-medium"
                        >
                            My Carpool
                        </a>
                        <a
                            href="/login"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}