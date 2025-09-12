import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  fullName: { type: String },
  element: { type: String, required: true },
  path: { type: String, required: true },
  rarity: { type: Number, required: true },
  spNeed: { type: Number },
  release: { type: Boolean },
  description: { type: String },
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

const Character = mongoose.model('Character', CharacterSchema);
export default Character; 