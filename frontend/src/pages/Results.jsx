import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const { data } = await axios.get('http://localhost:5000/api/submit/my-results');
      setResults(data);
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h2>My Results</h2>
      {results.map(res => (
        <div key={res._id}>
          <h3>{res.quiz.title}</h3>
          <p>Score: {res.score}/{res.totalQuestions}</p>
          <p>Submitted: {new Date(res.submittedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}