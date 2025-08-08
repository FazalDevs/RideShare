import express from 'express'
import axios from 'axios';
import CarpoolListing from '../models/listing.models.js'
export const createListing = async (req, res) => {
    const { ownerName, branch, year, homeAddress, homeCoordinates, timings } = req.body;
    // console.log(req);
    const newListing = new CarpoolListing({
        ownerName,
        branch,
        year,
        homeAddress,
        homeCoordinates,
        homeLocation: {
            type: "Point",
            coordinates: [homeCoordinates.longitude, homeCoordinates.latitude] // [lng, lat]
        },
        timings,
        user: req.user.id
    });
    try {
        await newListing.save();
        return res.status(201).json({ message: "New listing created", newListing });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
export const updateListing = async (req, res) => {
    try {
        const listing = await CarpoolListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ message: "Listing updated", listing });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
export const deleteListing = async (req, res) => {
    try {
        await CarpoolListing.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Listing deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getListing = async (req, res) => {
    try {
        const listings = await CarpoolListing.find();
        return res.status(200).json({ message: "Listings found", listings });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const searchAddress = async (req, res) => {
    const { q } = req.query;

    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                format: 'json', q,
                extratags: 0,
                limit: 5
            },
            headers: {
                'User-Agent': 'RideshareApp/1.0 (your_email@example.com)',
                'Accept-Language': 'en'
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error("Nominatim API error:", error.message);
        return res.status(500).json({ error: 'Failed to fetch address suggestions' });
    }
};
export const searchMyCarpool = async (req, res) => {
    try {
        // console.log(req.user.id)
        const listings = await CarpoolListing.find({ user: req.user.id });
        return res.status(200).json({ message: "Listings found", listings });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const getNearbyCarpools = async (req, res) => {
    try {
        const { longitude, latitude, maxDistance = 5000 } = req.query;

        if (!longitude || !latitude) {
            return res.status(400).json({ message: "Longitude and latitude are required" });
        }

        const carpools = await CarpoolListing.find({
            homeLocation: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(maxDistance)
                }
            }
        });

        return res.status(200).json({
            success: true,
            count: carpools.length,
            listings: carpools
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export default {};