import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
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
  priority: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
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
  collection: 'Wishlist'
});

// Compound index to ensure a user can't have duplicate characters in wishlist
WishlistSchema.index({ userId: 1, characterId: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
export default Wishlist; 