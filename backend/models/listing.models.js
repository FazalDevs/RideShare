import mongoose from 'mongoose';


const carpoolSchema = new mongoose.Schema({
    ownerName: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, enum: ["1st", "2nd", "3rd", "4th"], required: true },
    homeAddress: { type: String, required: true },
    homeCoordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    timings: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
const CarpoolListing = mongoose.model("CarpoolListing", carpoolSchema);
export default CarpoolListing;
