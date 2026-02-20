const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true }, // index of correct option (0-based)
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }
});

module.exports = mongoose.model('Question', QuestionSchema);