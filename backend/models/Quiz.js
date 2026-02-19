const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);