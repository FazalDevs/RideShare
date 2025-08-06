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
    homeLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number] // [longitude, latitude]
        }
    },
    timings: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User2", required: true },
    requests: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User2' },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    }]
});
carpoolSchema.index({ homeLocation: '2dsphere' });
const CarpoolListing = mongoose.model("CarpoolListing", carpoolSchema);
export default CarpoolListing;
