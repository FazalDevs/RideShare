import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import listingRoutes from './routes/listing.route.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser'
import requestRoutes from './routes/request.route.js';
dotenv.config();
const app = express();
app.use(cors(
    {
        origin: ['https://rideshare-frontend-kixr.onrender.com', 'http://localhost:5173'],
        credentials: true,
    }
));
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use('/listing', listingRoutes);
app.use('/user', userRoutes);
app.use('/request', requestRoutes);

const uri = process.env.MONGO_URI;
try {
    await mongoose.connect(uri)
    console.log('MongoDB connected...');
} catch (error) {
    console.log(error);

}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


