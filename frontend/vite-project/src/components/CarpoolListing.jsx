import L from "leaflet";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NavbarLogout from "./NavbarLogout";
import toast from 'react-hot-toast';

// Custom marker icons
const defaultIcon = L.icon({
    iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const selectedAreaIcon = L.icon({
    iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const pdeuIcon = L.icon({
    iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const PDEU_COORDINATES = { latitude: 23.15635435, longitude: 72.66527735176405 }; // Fixed PDEU coordinates

const CarpoolListings = () => {
    const [listings, setListings] = useState([]);
    const [selectedCoordinates, setSelectedCoordinates] = useState(null);
    const [route, setRoute] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedArea, setSelectedArea] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAreaCoordinates, setSelectedAreaCoordinates] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get("https://rideshare-backend-eg6m.onrender.com/listing/fetch", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                setListings(response.data.listings || []);
            } catch (error) {
                console.error("Error fetching listings:", error);
                setListings([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchListings();
    }, []);

    const fetchRoute = async (start, end) => {
        try {
            const response = await axios.get(
                `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`
            );

            const coordinates = response.data.routes[0].geometry.coordinates;
            const routeCoordinates = coordinates.map(([lng, lat]) => [lat, lng]);
            setRoute(routeCoordinates);
        } catch (error) {
            console.error("Error fetching route:", error);
            setRoute([]);
        }
    };

    const handleListingClick = (coordinates) => {
        if (
            selectedCoordinates &&
            selectedCoordinates.latitude === coordinates.latitude &&
            selectedCoordinates.longitude === coordinates.longitude
        ) {
            setSelectedCoordinates(null);
            setRoute([]);
        } else {
            setSelectedCoordinates(coordinates);
            fetchRoute(
                { latitude: coordinates.latitude, longitude: coordinates.longitude },
                { latitude: PDEU_COORDINATES.latitude, longitude: PDEU_COORDINATES.longitude }
            );
        }
    };

    const fetchSuggestions = useCallback(
        async (query) => {
            if (query.length > 3) {
                try {
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
                    );

                    if (response.data.length > 0) {
                        setSuggestions(response.data.slice(0, 5)); // Limit to 5 suggestions
                    } else {
                        setSuggestions([]);
                    }
                } catch (error) {
                    console.error("Error fetching address suggestions:", error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        },
        []
    );

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), [fetchSuggestions]);

    const handleAreaInputChange = (e) => {
        const query = e.target.value;
        setSelectedArea(query);
        debouncedFetchSuggestions(query);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedArea(suggestion.display_name);
        setSelectedAreaCoordinates({
            latitude: parseFloat(suggestion.lat),
            longitude: parseFloat(suggestion.lon),
        });
        setSuggestions([]);
    };

    const handleSendRequest = async (carpoolId) => {
        try {
            const response = await axios.post(
                `https://rideshare-backend-eg6m.onrender.com/request/${carpoolId}/`,
                {},
                { withCredentials: true }
            );
            toast.success('Request sent successfully');
        } catch (error) {
            console.error("Error sending request:", error);
            toast.error(error.response.data.message || error || 'Failed to send request');
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
    }

    return (
        <div>
            <NavbarLogout />
            <div className="flex flex-col md:flex-row h-screen">
                <div className="w-full md:w-1/3 p-4 overflow-y-auto border-r bg-grey">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Carpool Listings</h2>
                    <div className="mb-4 relative">
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Destination Area:
                        </label>
                        <div className="flex space-x-2">
                            <input
                                id="area"
                                type="text"
                                value={selectedArea}
                                onChange={handleAreaInputChange}
                                placeholder="Enter area name"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {suggestions.length > 0 && (
                            <div className="absolute top-12 left-0 w-full bg-white border rounded shadow-lg z-10">
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.display_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Click on a listing to view the route from the address to PDEU.
                    </p>
                    {Array.isArray(listings) &&
                        listings.map((listing) => (
                            <div
                                key={listing._id}
                                className="p-4 mb-4 border rounded-lg shadow-sm bg-white transition-transform transform hover:scale-105 hover:shadow-md cursor-pointer"
                                onClick={() =>
                                    handleListingClick({
                                        latitude: listing.homeCoordinates.latitude,
                                        longitude: listing.homeCoordinates.longitude,
                                    })
                                }
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{listing.ownerName}</h3>
                                <div className="mt-2 text-sm text-gray-600 space-y-1">
                                    <p>
                                        <span className="font-medium text-gray-700">Branch:</span> {listing.branch}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-700">Year:</span> {listing.year}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-700">Timings:</span> {listing.timings}
                                    </p>
                                    <p className="truncate">
                                        <span className="font-medium text-gray-700">Address:</span> {listing.homeAddress}
                                    </p>
                                </div>
                                <div className="mt-3 text-blue-500 font-medium text-sm">
                                    Click to view route to PDEU
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering listing click event
                                        handleSendRequest(listing._id);
                                    }}
                                    className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
                                >
                                    Send Request
                                </button>
                            </div>
                        ))}
                </div>
                <div className="w-full md:w-2/3 h-96 md:h-auto">
                    <MapContainer
                        center={[23.0225, 72.5714]}
                        zoom={12}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        {selectedCoordinates && (
                            <Marker
                                position={[selectedCoordinates.latitude, selectedCoordinates.longitude]}
                                icon={defaultIcon}
                            >
                                <Popup>Selected Listing</Popup>
                            </Marker>
                        )}
                        <Marker
                            position={[PDEU_COORDINATES.latitude, PDEU_COORDINATES.longitude]}
                            icon={pdeuIcon}
                        >
                            <Popup>PDEU</Popup>
                        </Marker>
                        {selectedAreaCoordinates && (
                            <Marker
                                position={[selectedAreaCoordinates.latitude, selectedAreaCoordinates.longitude]}
                                icon={selectedAreaIcon}
                            >
                                <Popup>Selected Area</Popup>
                            </Marker>
                        )}
                        {listings.map((listing) => (
                            <Marker
                                key={listing._id}
                                position={[
                                    listing.homeCoordinates.latitude,
                                    listing.homeCoordinates.longitude,
                                ]}
                                icon={defaultIcon}
                            >
                                <Popup>{listing.ownerName}</Popup>
                            </Marker>
                        ))}
                        {route.length > 0 && <Polyline positions={route} color="blue" />}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default CarpoolListings;