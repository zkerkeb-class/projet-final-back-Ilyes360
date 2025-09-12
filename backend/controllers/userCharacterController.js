import UserCharacter from '../models/UserCharacter.js';
import mongoose from 'mongoose';

// Create - Add a character to user's collection
const addUserCharacter = async (req, res) => {
  try {
    const { characterId, characterName, element, path, rarity, eidolon = 0, level = 1, notes = '' } = req.body;
    const userId = req.user.id; // From auth middleware

    // Check if user already owns this character
    const existingCharacter = await UserCharacter.findOne({ userId, characterId });
    if (existingCharacter) {
      return res.status(400).json({ message: 'Character already owned by user' });
    }

    const userCharacter = new UserCharacter({
      userId,
      characterId,
      characterName,
      element,
      path,
      rarity,
      eidolon,
      level,
      notes
    });

    await userCharacter.save();
    res.status(201).json(userCharacter);
  } catch (error) {
    res.status(500).json({ message: 'Error adding character to collection', error: error.message });
  }
};

// Read - Get all characters owned by user
const getUserCharacters = async (req, res) => {
  try {
    const userId = req.user.id;
    const userCharacters = await UserCharacter.find({ userId }).sort({ addedAt: -1 });
    res.json(userCharacters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user characters', error: error.message });
  }
};

// Read - Get a specific user character by ID
const getUserCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const userCharacter = await UserCharacter.findOne({ _id: id, userId });
    if (!userCharacter) {
      return res.status(404).json({ message: 'Character not found in your collection' });
    }
    
    res.json(userCharacter);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching character', error: error.message });
  }
};

// Update - Update a user character
const updateUserCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    const userCharacter = await UserCharacter.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!userCharacter) {
      return res.status(404).json({ message: 'Character not found in your collection' });
    }

    res.json(userCharacter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating character', error: error.message });
  }
};

// Delete - Remove a character from user's collection
const deleteUserCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const userCharacter = await UserCharacter.findOneAndDelete({ _id: id, userId });
    
    if (!userCharacter) {
      return res.status(404).json({ message: 'Character not found in your collection' });
    }

    res.json({ message: 'Character removed from collection successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing character from collection', error: error.message });
  }
};

// Get user character statistics
const getUserCharacterStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const stats = await UserCharacter.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalCharacters: { $sum: 1 },
          totalEidolons: { $sum: '$eidolon' },
          averageLevel: { $avg: '$level' },
          byElement: {
            $push: {
              element: '$element',
              characterName: '$characterName'
            }
          },
          byPath: {
            $push: {
              path: '$path',
              characterName: '$characterName'
            }
          },
          byRarity: {
            $push: {
              rarity: '$rarity',
              characterName: '$characterName'
            }
          }
        }
      }
    ]);

    res.json(stats[0] || { totalCharacters: 0, totalEidolons: 0, averageLevel: 0, byElement: [], byPath: [], byRarity: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching character statistics', error: error.message });
  }
};

export {
  addUserCharacter,
  getUserCharacters,
  getUserCharacterById,
  updateUserCharacter,
  deleteUserCharacter,
  getUserCharacterStats
}; 