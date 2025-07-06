import Character from '../models/Character.js';

// Create a new character
const createCharacter = async (req, res, next) => {
  try {
    const character = new Character(req.body);
    await character.save();
    res.status(201).json(character);
  } catch (err) {
    next(err);
  }
};

// Get all characters
const getCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

// Get a character by ID
const getCharacterById = async (req, res, next) => {
  try {
    const character = await Character.findOne({ id: req.params.id });
    if (!character) return res.status(404).json({ message: 'Character not found' });
    res.json(character);
  } catch (err) {
    next(err);
  }
};

// Update a character by ID
const updateCharacter = async (req, res, next) => {
  try {
    const character = await Character.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!character) return res.status(404).json({ message: 'Character not found' });
    res.json(character);
  } catch (err) {
    next(err);
  }
};

// Delete a character by ID
const deleteCharacter = async (req, res, next) => {
  try {
    const character = await Character.findOneAndDelete({ id: req.params.id });
    if (!character) return res.status(404).json({ message: 'Character not found' });
    res.json({ message: 'Character deleted' });
  } catch (err) {
    next(err);
  }
};

// Filter characters by path
const getCharactersByPath = async (req, res, next) => {
  try {
    const { path } = req.params;
    const characters = await Character.find({ path });
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

// Filter characters by element
const getCharactersByElement = async (req, res, next) => {
  try {
    const { element } = req.params;
    const characters = await Character.find({ element });
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

// Filter characters by both path and element
const getCharactersByPathAndElement = async (req, res, next) => {
  try {
    const { path, element } = req.query;
    const filter = {};
    if (path) filter.path = path;
    if (element) filter.element = element;
    const characters = await Character.find(filter);
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

// Get all unique paths
const getAllPaths = async (req, res, next) => {
  try {
    const paths = await Character.distinct('path');
    res.json(paths);
  } catch (err) {
    next(err);
  }
};

// Get all unique elements
const getAllElements = async (req, res, next) => {
  try {
    const elements = await Character.distinct('element');
    res.json(elements);
  } catch (err) {
    next(err);
  }
};

// Filter characters by rarity
const getCharactersByRarity = async (req, res, next) => {
  try {
    const { rarity } = req.params;
    const characters = await Character.find({ rarity: Number(rarity) });
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

// Filter characters by both element and rarity
const getCharactersByElementAndRarity = async (req, res, next) => {
  try {
    const { element, rarity } = req.query;
    const filter = {};
    if (element) filter.element = element;
    if (rarity) filter.rarity = Number(rarity);
    const characters = await Character.find(filter);
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

// Filter characters by rarity and path
const getCharactersByRarityAndPath = async (req, res, next) => {
  try {
    const { rarity, path } = req.query;
    const filter = {};
    if (rarity) filter.rarity = Number(rarity);
    if (path) filter.path = path;
    const characters = await Character.find(filter);
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

// Filter characters by rarity, path, and element
const getCharactersByRarityPathElement = async (req, res, next) => {
  try {
    const { rarity, path, element } = req.query;
    const filter = {};
    if (rarity) filter.rarity = Number(rarity);
    if (path) filter.path = path;
    if (element) filter.element = element;
    const characters = await Character.find(filter);
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

export {
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  getCharactersByPath,
  getCharactersByElement,
  getCharactersByPathAndElement,
  getAllPaths,
  getAllElements,
  getCharactersByRarity,
  getCharactersByElementAndRarity,
  getCharactersByRarityAndPath,
  getCharactersByRarityPathElement
}; 