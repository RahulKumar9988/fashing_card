require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Flashcard Schema and Model
const flashcardSchema = new mongoose.Schema({
    question: String,
    answer: String
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

app.use('/*', cors());
// CRUD Routes

app.post('/flashcards', async (req, res) => {
    const { question, answer } = req.body;
    const flashcard = new Flashcard({ question, answer });
    await flashcard.save();
    res.status(201).json(flashcard);
});

app.get('/flashcards', async (req, res) => {
    const flashcards = await Flashcard.find();
    res.status(200).json(flashcards);
});

app.put('/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const flashcard = await Flashcard.findByIdAndUpdate(id, { question, answer }, { new: true });
    res.status(200).json(flashcard);
});

app.delete('/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    await Flashcard.findByIdAndDelete(id);
    res.status(204).send();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
