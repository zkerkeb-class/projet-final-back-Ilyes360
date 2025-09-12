import express from 'express';
import * as wishlistController from '../controllers/wishlistController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create - Add character to wishlist
router.post('/add', wishlistController.addToWishlist);

// Read - Get user's wishlist
router.get('/my-wishlist', wishlistController.getWishlist);

// Read - Get specific wishlist item by ID
router.get('/:id', wishlistController.getWishlistItemById);

// Update - Update wishlist item
router.put('/update/:id', wishlistController.updateWishlistItem);

// Delete - Remove character from wishlist
router.delete('/remove/:id', wishlistController.deleteWishlistItem);

// Move character from wishlist to owned collection
router.post('/move-to-owned/:id', wishlistController.moveToOwned);

// Get wishlist statistics
router.get('/stats/overview', wishlistController.getWishlistStats);

export default router; 