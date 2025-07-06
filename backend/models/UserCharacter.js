import mongoose from 'mongoose';

const UserCharacterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  characterId: {
    type: String,
    required: true
  },
  characterName: {
    type: String,
    required: true
  },
  element: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  rarity: {
    type: Number,
    required: true
  },
  eidolon: {
    type: Number,
    default: 0,
    min: 0,
    max: 6
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 80
  },
  notes: {
    type: String,
    default: ''
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'UserCharacters'
});

// Compound index to ensure a user can't have duplicate characters
UserCharacterSchema.index({ userId: 1, characterId: 1 }, { unique: true });

const UserCharacter = mongoose.model('UserCharacter', UserCharacterSchema);
export default UserCharacter; 