import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarLogout from "./NavbarLogout";

const MyCarpool = () => {
    const [carpools, setCarpools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [requests, setRequests] = useState({});

    const fetchCarpools = async () => {
        try {
            const response = await axios.get("https://rideshare-backend-eg6m.onrender.com/listing/mycarpool", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setCarpools(response.data.listings);
            setLoading(false);
        } catch (err) {
            setError("Failed to load carpools. Please try again later.");
            setLoading(false);
        }
    };

    const fetchRequests = async (carpoolId) => {
        try {
            const response = await axios.get(`https://rideshare-backend-eg6m.onrender.com/request/${carpoolId}`, {
                withCredentials: true,
            });
            setRequests((prev) => ({
                ...prev,
                [carpoolId]: response.data,
            }));
        } catch (err) {
            console.error("Error fetching requests:", err);
        }
    };

    const deleteCarpool = async (id) => {
        try {
            await axios.delete(`https://rideshare-backend-eg6m.onrender.com/listing/delete/${id}`, {
                withCredentials: true,
            });
            setCarpools((prevCarpools) => prevCarpools.filter((carpool) => carpool._id !== id));
        } catch (err) {
            setError("Failed to delete the carpool. Please try again later.");
        }
    };

    useEffect(() => {
        fetchCarpools();
    }, []);

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
                                    {/* Fetch Requests Button */}
                                    <button
                                        onClick={() => fetchRequests(carpool._id)}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                    >
                                        View Requests
                                    </button>

                                    {/* Display Requests */}
                                    {requests[carpool._id] && (
                                        <div className="mt-4 p-3 border rounded-lg bg-gray-100">
                                            <h3 className="font-semibold text-lg">Requests:</h3>
                                            {requests[carpool._id].length === 0 ? (
                                                <p className="text-gray-500">No requests yet.</p>
                                            ) : (
                                                <ul>
                                                    {requests[carpool._id].map((req) => (
                                                        <li key={req.user._id} className="p-2 border-b">
                                                            <p><strong>Name:</strong> {req.user.name}</p>
                                                            <p><strong>Email:</strong> {req.user.email}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}

                                    {/* Delete Carpool Button */}
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
