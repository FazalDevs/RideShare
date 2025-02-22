import React, { useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import NavbarLogout from "./NavbarLogout";
import L from "leaflet";

const AddressForm = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [formData, setFormData] = useState({
        ownerName: "",
        branch: "",
        year: "1st",
        timings: "",
    });
    const debounceTimeout = useRef(null);

    const PDEU_COORDINATES = [23.15635435, 72.66527735176405];

    const fetchSuggestions = async (value) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
            );
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
            setSuggestions([]);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            if (value.trim().length >= 3) {
                fetchSuggestions(value.trim());
            } else {
                setSuggestions([]);
            }
        }, 300);
    };

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        setQuery(address.display_name);
        setSuggestions([]);
        fetchRoute(address.lat, address.lon);
    };

    const fetchRoute = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://router.project-osrm.org/route/v1/driving/${lon},${lat};${PDEU_COORDINATES[1]},${PDEU_COORDINATES[0]}?overview=full&geometries=geojson`
            );

            const coordinates = response.data.routes[0].geometry.coordinates.map((coord) => [
                coord[1],
                coord[0],
            ]);
            setRouteCoordinates(coordinates);
        } catch (error) {
            console.error("Error fetching route:", error);
            alert("Failed to fetch route. Please try again.");
        }
    };
    const customIcon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAddress) {
            alert("Please select a valid address.");
            return;
        }

        const submissionData = {
            ownerName: formData.ownerName,
            branch: formData.branch,
            year: formData.year,
            timings: formData.timings,
            homeAddress: selectedAddress.display_name,
            homeCoordinates: {
                latitude: selectedAddress.lat,
                longitude: selectedAddress.lon,
            },
        };

        try {
            const response = await axios.post(
                "https://rideshare-backend-eg6m.onrender.com/listing/create",
                submissionData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }
            );
            alert("Carpool created successfully!");
            // console.log(response.data);
            navigate('/listing')
        } catch (error) {
            console.error("Error creating carpool:", error);
            alert("Failed to create carpool. Please try again.");
        }
    };

    return (
        <div>
            <NavbarLogout />
            <div className="flex flex-wrap gap-6 p-6">
                {/* Form Section */}
                <div className="p-6 max-w-md bg-white shadow-lg rounded-xl w-full md:w-1/2 border">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Carpool Listing</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Owner Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Owner Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={formData.ownerName}
                                onChange={(e) =>
                                    setFormData({ ...formData, ownerName: e.target.value })
                                }
                                className="w-full mt-2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Branch */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Branch</label>
                            <input
                                type="text"
                                placeholder="Enter your branch"
                                value={formData.branch}
                                onChange={(e) =>
                                    setFormData({ ...formData, branch: e.target.value })
                                }
                                className="w-full mt-2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Year */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Year</label>
                            <select
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="w-full mt-2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
                                required
                            >
                                <option value="1st">1st</option>
                                <option value="2nd">2nd</option>
                                <option value="3rd">3rd</option>
                                <option value="4th">4th</option>
                            </select>
                        </div>

                        {/* Address Input */}
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-medium">Home Address</label>
                            <input
                                type="text"
                                placeholder="Start typing your address"
                                value={query}
                                onChange={handleInputChange}
                                className="w-full mt-2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
                                required
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute bg-white border rounded-lg shadow-lg mt-2 w-full z-10 max-h-40 overflow-y-auto">
                                    {suggestions.map((address) => (
                                        <li
                                            key={address.place_id}
                                            onClick={() => handleAddressSelect(address)}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                        >
                                            {address.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Timings */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium">Timings</label>
                            <input
                                type="text"
                                placeholder="e.g., 9:00 AM - 5:00 PM"
                                value={formData.timings}
                                onChange={(e) =>
                                    setFormData({ ...formData, timings: e.target.value })
                                }
                                className="w-full mt-2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Map Section */}
                <div className="w-full md:w-1/2 h-96 rounded-lg overflow-hidden shadow-lg border">
                    <MapContainer
                        center={PDEU_COORDINATES}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {selectedAddress && (
                            <Marker position={[selectedAddress.lat, selectedAddress.lon]} icon={customIcon} />
                        )}
                        <Marker position={PDEU_COORDINATES} icon={customIcon} />
                        <Marker position={PDEU_COORDINATES} />
                        {routeCoordinates.length > 0 && (
                            <Polyline positions={routeCoordinates} color="blue" />
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
