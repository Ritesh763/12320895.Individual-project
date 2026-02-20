import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const { data } = await axios.get('http://localhost:5000/api/quizzes');
      setQuizzes(data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.map(quiz => (
        <div key={quiz._id}>
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
          <Link to={`/quiz/${quiz._id}`}>Take Quiz</Link>
        </div>
      ))}
    </div>
  );
}