import express from 'express'
import { authenticate } from '../middleware/authorize.js';
import { createListing, deleteListing, getListing, searchAddress, searchMyCarpool, updateListing, getNearbyCarpools } from '../controllers/listing.controller.js';
const router = express.Router();


router.post('/create', authenticate, createListing);
router.get('/fetch', authenticate, getListing);
router.post('/update/:id', authenticate, updateListing);
router.delete('/delete/:id', authenticate, deleteListing);
router.get('/mycarpool', authenticate, searchMyCarpool);
router.get('/nearby', authenticate, getNearbyCarpools);
router.get('/search-address', authenticate, searchAddress);

export default router;