import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarLogout from "./NavbarLogout";

const MyCarpool = () => {
    const [carpools, setCarpools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCarpools = async () => {
        try {
            const response = await axios.get("http://localhost:4005/listing/mycarpool", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            setCarpools(response.data.listings); // Assuming API returns an array of carpool objects
            setLoading(false);
        } catch (err) {
            console.error("Error fetching carpools:", err);
            setError("Failed to load carpools. Please try again later.");
            setLoading(false);
        }
    };

    const deleteCarpool = async (id) => {
        try {
            await axios.delete(`http://localhost:4005/listing/delete/${id}`, {
                withCredentials: true,
            });
            // Update the state to remove the deleted carpool
            setCarpools((prevCarpools) => prevCarpools.filter((carpool) => carpool._id !== id));
        } catch (err) {
            console.error("Error deleting carpool:", err);
            setError("Failed to delete the carpool. Please try again later.");
        }
    };

    useEffect(() => {
        fetchCarpools();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg font-medium">Loading your carpools...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <NavbarLogout />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">My Carpools</h1>
                {carpools.length === 0 ? (
                    <p className="text-center text-gray-500">You haven't created any carpools yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.isArray(carpools) &&
                            carpools.map((carpool) => (
                                <div
                                    key={carpool._id}
                                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                                >
                                    <h2 className="text-xl font-semibold text-blue-600">
                                        {carpool.ownerName}
                                    </h2>
                                    <p className="text-gray-700 mt-2">
                                        <strong>Branch:</strong> {carpool.branch}
                                    </p>
                                    <p className="text-gray-700 mt-1">
                                        <strong>Year:</strong> {carpool.year}
                                    </p>
                                    <p className="text-gray-700 mt-1">
                                        <strong>Timings:</strong> {carpool.timings}
                                    </p>
                                    <p className="text-gray-700 mt-1">
                                        <strong>Home Address:</strong> {carpool.homeAddress}
                                    </p>
                                    <div className="mt-4">
                                        <p className="text-gray-700 text-sm">
                                            <strong>Coordinates:</strong> (
                                            {carpool.homeCoordinates.latitude},{" "}
                                            {carpool.homeCoordinates.longitude})
                                        </p>
                                    </div>
                                    {/* Delete button */}
                                    <button
                                        onClick={() => deleteCarpool(carpool._id)}
                                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCarpool;
