import React from "react";
import Navbar from "./Navbar";

export default function RideShareLandingPage() {
    return (
        <div className="bg-gradient-to-b from-[#004AAD] to-[#002F6C] min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-12 text-white">
                <div className="max-w-3xl mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Seamless Rides, Smarter Commutes
                    </h1>
                    <p className="text-lg text-gray-200">
                        Join a community of smart commuters—save money, reduce congestion, and travel responsibly.
                    </p>
                </div>

                {/* Cards Section */}
                <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl">
                    {/* Card 1 */}
                    <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 flex-1 text-gray-800 transition-transform transform hover:scale-105">
                        <h2 className="text-2xl font-semibold text-[#004AAD] mb-4">
                            Affordable & Convenient
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Share rides, cut costs, and make traveling easy.
                        </p>
                        <a
                            href="/carpoolForm"
                            className="bg-[#004AAD] hover:bg-[#002F6C] text-white px-6 py-3 rounded-lg w-full block text-center font-semibold transition-colors"
                        >
                            Start Your Ride
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 flex-1 text-gray-800 transition-transform transform hover:scale-105">
                        <h2 className="text-2xl font-semibold text-[#004AAD] mb-4">
                            Eco-Friendly Solution
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Reduce your carbon footprint by sharing rides.
                        </p>
                        <a
                            href="/listing"
                            className="bg-[#004AAD] hover:bg-[#002F6C] text-white px-6 py-3 rounded-lg w-full block text-center font-semibold transition-colors"
                        >
                            Find a Ride
                        </a>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#002F6C] py-6 text-center">
                <p className="text-gray-300 text-sm">
                    &copy; 2025 RideShare. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
