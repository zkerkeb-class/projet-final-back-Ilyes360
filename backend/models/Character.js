const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  fullName: String,
  element: String,
  path: String,
  rarity: Number,
  spNeed: Number,
  release: Boolean,
  description: String,
  speed: Number,
  taunt: Number,
  basehp: Number,
  baseatk: Number,
  basedef: Number,
  basicatkdescription: Array,
  basicatkname: Array,
  skilldescription:Array,
  skillname: Array,
  talentdescription: String,
  talentname: String,
  techniquedescription: String,
  techniquename: String,
  ultdescription: Array,
  ultname: Array
  // Add any other fields as needed from the JSON
},
{
  collection: 'Characters'}
  

);

CharacterSchema.index({ id: 1 }, { unique: true });




module.exports = mongoose.model('Character', CharacterSchema); 