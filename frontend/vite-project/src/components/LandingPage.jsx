import React from 'react';
import NavbarLogout from './NavbarLogout';
import Navbar from './Navbar';

export default function RideShareLandingPage() {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
                <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                    <div className="max-w-3xl mb-12">
                        <h1 className="text-5xl font-bold text-blue-800 mb-6">
                            Your Journey, Made Easier
                        </h1>
                        <p className="text-lg text-blue-600">
                            Connecting riders and drivers for a seamless and eco-friendly commuting experience.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl">
                        <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
                            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                                Affordable and Convenient
                            </h2>
                            <p className="text-blue-600 mb-6">
                                Share rides, save money, and reduce traffic on the road.
                            </p>
                            <a href="/carpoolForm" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full block text-center">
                                Start Your Ride
                            </a>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
                            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                                Eco-Friendly Solution
                            </h2>
                            <p className="text-blue-600 mb-6">
                                Lower your carbon footprint by carpooling with others.
                            </p>
                            <a href="/listing" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full block text-center">
                                Find a Ride
                            </a>
                        </div>
                    </div>
                </main>

                <footer className="bg-blue-200 py-6 text-center">
                    <p className="text-blue-700 text-sm">
                        &copy; 2025 RideShare. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
