import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', ''], correctOption: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', ''], correctOption: 0 }]);
  };

  const handleQuestionChange = (idx, field, value) => {
    const newQuestions = [...questions];
    if (field === 'questionText') {
      newQuestions[idx].questionText = value;
    } else if (field === 'correctOption') {
      newQuestions[idx].correctOption = parseInt(value);
    }
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options[optIdx] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/quizzes', { title, description, questions });
      navigate('/quizzes');
    } catch (err) {
      alert('Failed to create quiz');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Quiz</h2>
      
      <div>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <textarea
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {questions.map((q, qIdx) => (
        <div key={qIdx} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <h4>Question {qIdx + 1}</h4>
          
          <input
            type="text"
            placeholder="Question text"
            value={q.questionText}
            onChange={(e) => handleQuestionChange(qIdx, 'questionText', e.target.value)}
            required
          />

          {q.options.map((opt, optIdx) => (
            <div key={optIdx}>
              <input
                type="text"
                placeholder={`Option ${optIdx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                required
              />
            </div>
          ))}

          <div>
            <label>Correct Option: </label>
            <select
              value={q.correctOption}
              onChange={(e) => handleQuestionChange(qIdx, 'correctOption', e.target.value)}
            >
              {q.options.map((_, idx) => (
                <option key={idx} value={idx}>
                  Option {idx + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <button type="button" onClick={addQuestion}>
        Add Question
      </button>

      <button type="submit">Create Quiz</button>
    </form>
  );
}