import Wishlist from '../models/Wishlist.js';
import UserCharacter from '../models/UserCharacter.js';
import mongoose from 'mongoose';

// Create - Add a character to user's wishlist
const addToWishlist = async (req, res) => {
  try {
    const { characterId, characterName, element, path, rarity, priority = 1, notes = '' } = req.body;
    const userId = req.user.id; // From auth middleware

    // Check if character is already in wishlist
    const existingWishlistItem = await Wishlist.findOne({ userId, characterId });
    if (existingWishlistItem) {
      return res.status(400).json({ message: 'Character already in wishlist' });
    }

    const wishlistItem = new Wishlist({
      userId,
      characterId,
      characterName,
      element,
      path,
      rarity,
      priority,
      notes
    });

    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding character to wishlist', error: error.message });
  }
};

// Read - Get all characters in user's wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.find({ userId }).sort({ priority: -1, addedAt: -1 });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};

// Read - Get a specific wishlist item by ID
const getWishlistItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const wishlistItem = await Wishlist.findOne({ _id: id, userId });
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    
    res.json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist item', error: error.message });
  }
};

// Update - Update a wishlist item
const updateWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    const wishlistItem = await Wishlist.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating wishlist item', error: error.message });
  }
};

// Delete - Remove a character from user's wishlist
const deleteWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const wishlistItem = await Wishlist.findOneAndDelete({ _id: id, userId });
    
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json({ message: 'Character removed from wishlist successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing character from wishlist', error: error.message });
  }
};

// Move character from wishlist to owned collection
const moveToOwned = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const wishlistItem = await Wishlist.findOne({ _id: id, userId });
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    // Check if user already owns this character
    const existingCharacter = await UserCharacter.findOne({ userId, characterId: wishlistItem.characterId });
    if (existingCharacter) {
      return res.status(400).json({ message: 'Character already owned by user' });
    }

    // Add character to user's collection
    const userCharacter = new UserCharacter({
      userId,
      characterId: wishlistItem.characterId,
      characterName: wishlistItem.characterName,
      element: wishlistItem.element,
      path: wishlistItem.path,
      rarity: wishlistItem.rarity,
      eidolon: 0,
      level: 1,
      notes: wishlistItem.notes || ''
    });

    await userCharacter.save();

    // Remove from wishlist
    await Wishlist.findByIdAndDelete(id);

    res.json({
      message: 'Character successfully added to collection and removed from wishlist',
      characterName: wishlistItem.characterName,
      characterData: userCharacter
    });
  } catch (error) {
    res.status(500).json({ message: 'Error moving character to owned collection', error: error.message });
  }
};

// Get wishlist statistics
const getWishlistStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const stats = await Wishlist.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          averagePriority: { $avg: '$priority' },
          byElement: {
            $push: {
              element: '$element',
              characterName: '$characterName',
              priority: '$priority'
            }
          },
          byPath: {
            $push: {
              path: '$path',
              characterName: '$characterName',
              priority: '$priority'
            }
          },
          byRarity: {
            $push: {
              rarity: '$rarity',
              characterName: '$characterName',
              priority: '$priority'
            }
          }
        }
      }
    ]);

    res.json(stats[0] || { totalItems: 0, averagePriority: 0, byElement: [], byPath: [], byRarity: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist statistics', error: error.message });
  }
};

export {
  addToWishlist,
  getWishlist,
  getWishlistItemById,
  updateWishlistItem,
  deleteWishlistItem,
  moveToOwned,
  getWishlistStats
}; 