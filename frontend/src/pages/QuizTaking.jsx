import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function QuizTaking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState([null, null]);
  
  const [quiz, setQuiz] = useState({
    title: 'Sample Quiz',
    description: 'Test your knowledge',
    questions: [
      {
        questionText: 'What is 2+2?',
        options: ['3', '4', '5', '6'],
        correctOption: 1
      },
      {
        questionText: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctOption: 2
      }
    ]
  });

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOptionChange = (qIndex, optIndex) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOption) {
        score++;
      }
    });
    
    alert(`Quiz submitted! Your score: ${score}/${quiz.questions.length}`);
    navigate('/results');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        Time left: {timeLeft} seconds
      </p>

      {quiz.questions.map((q, idx) => (
        <div key={idx} style={{ 
          border: '1px solid #ccc', 
          margin: '20px 0', 
          padding: '15px',
          borderRadius: '5px'
        }}>
          <p><strong>{idx + 1}. {q.questionText}</strong></p>
          
          {q.options.map((opt, optIdx) => (
            <div key={optIdx} style={{ margin: '10px 0' }}>
              <label>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={optIdx}
                  checked={answers[idx] === optIdx}
                  onChange={() => handleOptionChange(idx, optIdx)}
                  style={{ marginRight: '10px' }}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      <button 
        onClick={handleSubmit}
        style={{
          padding: '10px 30px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Submit Quiz
      </button>
    </div>
  );
}