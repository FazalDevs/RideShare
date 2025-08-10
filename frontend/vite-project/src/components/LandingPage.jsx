import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { FaCarSide, FaLeaf } from "react-icons/fa";

export default function RideShareLandingPage() {
    return (
        <div className="bg-gradient-to-b from-[#004AAD] via-[#003F94] to-[#002F6C] min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-12 text-white relative overflow-hidden">
                {/* Background Animated Shapes */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 -top-20 -left-20 animate-pulse"></div>
                    <div className="absolute w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 top-1/2 -right-20 animate-pulse delay-1000"></div>
                </div>

                <motion.div
                    className="max-w-3xl mb-12 z-10"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                        Seamless Rides, <span className="text-yellow-300">Smarter Commutes</span>
                    </h1>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                        Join a community of smart commuters—save money, reduce congestion, and travel responsibly.
                    </p>
                </motion.div>

                {/* Cards Section */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {/* Card 1 */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-8 flex-1 text-white border border-white/30"
                    >
                        <FaCarSide className="text-4xl mb-4 text-yellow-300" />
                        <h2 className="text-2xl font-semibold mb-4">
                            Affordable & Convenient
                        </h2>
                        <p className="text-gray-200 mb-6">
                            Share rides, cut costs, and make traveling easy.
                        </p>
                        <a
                            href="/carpoolForm"
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg w-full block text-center font-semibold transition-colors"
                        >
                            Start Your Ride
                        </a>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-8 flex-1 text-white border border-white/30"
                    >
                        <FaLeaf className="text-4xl mb-4 text-green-300" />
                        <h2 className="text-2xl font-semibold mb-4">
                            Eco-Friendly Solution
                        </h2>
                        <p className="text-gray-200 mb-6">
                            Reduce your carbon footprint by sharing rides.
                        </p>
                        <a
                            href="/listing"
                            className="bg-green-400 hover:bg-green-500 text-gray-900 px-6 py-3 rounded-lg w-full block text-center font-semibold transition-colors"
                        >
                            Find a Ride
                        </a>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="mt-16 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 max-w-2xl w-full z-10"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <h3 className="text-xl font-semibold mb-3">Ready to ride smarter?</h3>
                    <p className="text-gray-200 mb-4">
                        Sign up today and start sharing rides with people around you.
                    </p>
                    <a
                        href="/register"
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Get Started
                    </a>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="bg-[#002F6C] py-6 text-center border-t border-white/10">
                <p className="text-gray-300 text-sm">
                    &copy; 2025 RideShare. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
