
const express = require('express');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @route POST /api/quizzes (admin only)
router.post('/', protect, admin, async (req, res) => {
  const { title, description, questions } = req.body; // questions is array of question objects
  try {
    const quiz = await Quiz.create({
      title,
      description,
      createdBy: req.user._id
    });

    // Create questions and associate with quiz
    const questionDocs = await Question.insertMany(
      questions.map(q => ({ ...q, quiz: quiz._id }))
    );

    quiz.questions = questionDocs.map(q => q._id);
    await quiz.save();

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/quizzes (public)
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/quizzes/:id (public)
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route DELETE /api/quizzes/:id (admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    await Question.deleteMany({ quiz: quiz._id });
    await quiz.remove();

    res.json({ message: 'Quiz removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;