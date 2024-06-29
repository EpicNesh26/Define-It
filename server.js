// server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const dotenv = require('dotenv');

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dictionary');

const wordSchema = new mongoose.Schema({
  term: String,
  definition: String,
  synonyms: [String],
  antonyms: [String],
});

const Word = mongoose.model('Word', wordSchema);

// Route to get word definition from the database or external API
// app.get('/api/word/:term', async (req, res) => {
//   const term = req.params.term.toLowerCase();
//   let word = await Word.findOne({ term });

//   if (word) {
//     res.json(word);
//   } else {
//     try {
//       const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
//       const apiResponse = response.data[0];

//       const wordData = {
//         term,
//         definition: apiResponse.meanings[0].definitions[0].definition,
//         synonyms: apiResponse.meanings[0].definitions[0].synonyms || [],
//         antonyms: apiResponse.meanings[0].definitions[0].antonyms || [],
//       };

//       // Save word to the database
//       word = new Word(wordData);
//       await word.save();

//       res.json(wordData);
//     } catch (error) {
//       res.status(404).json({ message: 'Word not found' });
//     }
//   }
// });

app.get('/api/word/:term', async (req, res) => {
  const term = req.params.term.toLowerCase();
  let word = await Word.findOne({ term });

  if (word) {
    res.json(word);
  } else {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
      const apiResponse = response.data[0];

      const wordData = {
        term,
        definition: apiResponse.meanings[0].definitions[0].definition,
        partOfSpeech: apiResponse.meanings[0].partOfSpeech,
        example: apiResponse.meanings[0].definitions[0].example || 'No example available.',
        pronunciation: apiResponse.phonetic || 'No pronunciation available.',
        audio: apiResponse.phonetics[0]?.audio || '',
        synonyms: apiResponse.meanings[0].definitions[0].synonyms || [],
        antonyms: apiResponse.meanings[0].definitions[0].antonyms || [],
      };

      // Save word to the database
      word = new Word(wordData);
      await word.save();

      res.json(wordData);
    } catch (error) {
      res.status(404).json({ message: 'Word not found' });
    }
  }
});



app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
