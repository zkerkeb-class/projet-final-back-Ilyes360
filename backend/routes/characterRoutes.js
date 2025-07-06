import express from 'express';
import * as characterController from '../controllers/characterController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Create
router.post('/addCharacter',  characterController.createCharacter);
// Filter by path and element
router.get('/filter', characterController.getCharactersByPathAndElement);
// Filter by element and rarity
router.get('/filterByElementAndRarity', characterController.getCharactersByElementAndRarity);
// Filter by rarity and path
router.get('/filterByRarityAndPath', characterController.getCharactersByRarityAndPath);
// Filter by rarity, path, and element
router.get('/filterByRarityPathElement', characterController.getCharactersByRarityPathElement);
// Filter by element
router.get('/filter/element/:element', characterController.getCharactersByElement);
// Filter by path
router.get('/filter/path/:path', characterController.getCharactersByPath);
// Filter by rarity
router.get('/rarity/:rarity', characterController.getCharactersByRarity);
// Get all unique paths
router.get('/paths', characterController.getAllPaths);
// Get all unique elements
router.get('/elements', characterController.getAllElements);
// Read all
router.get('/getCharacters',characterController.getCharacters);
// Get a character by ID (should be last)
router.get('/:id', characterController.getCharacterById);
// Update
router.put('/updateCharacter/:id', characterController.updateCharacter);
// Delete
router.delete('/deleteCharacter/:id', characterController.deleteCharacter);

export default router; 