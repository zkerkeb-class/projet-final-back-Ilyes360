import express from 'express';
import * as userCharacterController from '../controllers/userCharacterController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create - Add character to user's collection
router.post('/add', userCharacterController.addUserCharacter);

// Read - Get all user's characters
router.get('/my-characters', userCharacterController.getUserCharacters);

// Read - Get specific user character by ID
router.get('/:id', userCharacterController.getUserCharacterById);

// Update - Update user character
router.put('/update/:id', userCharacterController.updateUserCharacter);

// Delete - Remove character from user's collection
router.delete('/remove/:id', userCharacterController.deleteUserCharacter);

// Get user character statistics
router.get('/stats/overview', userCharacterController.getUserCharacterStats);

export default router; 