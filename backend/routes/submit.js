const express = require('express');
const Result = require('../models/Result');
const Quiz = require('../models/Quiz');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route POST /api/submit/:quizId
router.post('/:quizId', protect, async (req, res) => {
  const { answers } = req.body; // answers is array of selected option indices
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOption) score++;
    });

    const result = await Result.create({
      user: req.user._id,
      quiz: quiz._id,
      score,
      totalQuestions: quiz.questions.length,
      answers
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/submit/my-results
router.get('/my-results', protect, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id }).populate('quiz');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;