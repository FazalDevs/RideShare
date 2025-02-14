import express from 'express'
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
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${q}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
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
export default {};