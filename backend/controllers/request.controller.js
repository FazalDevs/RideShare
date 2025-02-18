import CarpoolListing from "../models/listing.models.js";
// import User from "../models/user.model.js";
import mongoose from 'mongoose'
export const requestToJoin = async (req, res) => {
    try {
        const { carpoolId } = req.params;
        const userId = req.user?.id;

        // Check if userId is available
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        // Validate carpoolId
        if (!mongoose.Types.ObjectId.isValid(carpoolId)) {
            return res.status(400).json({ message: "Invalid carpool ID" });
        }

        const carpool = await CarpoolListing.findById(carpoolId);
        if (!carpool) {
            return res.status(404).json({ message: "Carpool not found" });
        }

        // Check if the user has already sent a request
        const existingRequest = carpool.requests.find(request => request.user.toString() === userId);
        if (existingRequest) {
            return res.status(400).json({ message: "Request already sent" });
        }

        // Add the request to the carpool
        carpool.requests.push({ user: userId });
        await carpool.save();

        return res.status(200).json({ message: "Request sent successfully" });
    } catch (error) {
        console.error("Error in requestToJoin:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getRequests = async (req, res) => {
    try {
        const { carpoolId } = req.params;
        const carpool = await CarpoolListing.findById(carpoolId).populate("requests.user", "name email");
        if (!carpool) return res.status(404).json({ message: "Carpool not found" });
        return res.json(carpool.requests);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateRequestStatus = async (req, res) => {
    try {
        const { carpoolId, requestId } = req.params;
        const { status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const carpool = await CarpoolListing.findById(carpoolId);
        if (!carpool) return res.status(404).json({ message: "Carpool not found" });

        const request = carpool.requests.id(requestId);
        if (!request) return res.status(404).json({ message: "Request not found" });

        request.status = status;
        await carpool.save();

        return res.json({ message: `Request ${status}` });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
