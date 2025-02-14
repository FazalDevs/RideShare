import express from 'express'
import { authenticate } from '../middleware/authorize.js';
import { createListing, deleteListing, getListing, searchAddress, searchMyCarpool, updateListing } from '../controllers/listing.controller.js';
const router = express.Router();


router.post('/create', authenticate, createListing);
router.get('/fetch', authenticate, getListing);
router.post('/update/:id', authenticate, updateListing);
router.delete('/delete/:id', authenticate, deleteListing);
router.get('/mycarpool', authenticate, searchMyCarpool);



export default router;