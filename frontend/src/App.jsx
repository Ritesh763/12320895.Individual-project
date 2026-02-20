import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const containerStyle = {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '40px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{
        color: '#333',
        fontSize: '3em',
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        📝 Online Quiz System
      </h1>
      <p style={{ color: '#666', fontSize: '1.3em', marginBottom: '30px' }}>
        Test your knowledge of JavaScript and MongoDB!
      </p>
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '10px',
        marginTop: '30px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>Quiz Features:</h3>
        <p style={{ color: '#555', margin: '10px 0' }}>✅ 15 Random Questions Each Time</p>
        <p style={{ color: '#555', margin: '10px 0' }}>✅ JavaScript & MongoDB Topics</p>
        <p style={{ color: '#555', margin: '10px 0' }}>✅ Instant Scoring</p>
        <p style={{ color: '#555', margin: '10px 0' }}>✅ Detailed Results</p>
        <Link to="/quiz">
          <button style={{
            padding: '15px 50px',
            fontSize: '1.3em',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            marginTop: '30px',
            transition: 'transform 0.3s',
            boxShadow: '0 5px 20px rgba(102, 126, 234, 0.4)'
          }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            Start Quiz Now 🚀
          </button>
        </Link>
      </div>
    </div>
  );
}

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  // All available questions (30 total - 15 JavaScript + 15 MongoDB)
  const questionBank = [
    // JavaScript Questions (0-14)
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var myVariable;", "variable myVariable;", "v myVariable;", "let myVariable;"],
      correct: 0,
      explanation: "Both 'var' and 'let' are correct ways, but 'var' is the traditional way."
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "Apple"],
      correct: 1,
      explanation: "JavaScript was developed by Brendan Eich at Netscape in 1995."
    },
    {
      question: "What is the output of '2' + 2 in JavaScript?",
      options: ["4", "22", "NaN", "Error"],
      correct: 1,
      explanation: "JavaScript performs type coercion and converts number to string, resulting in '22'."
    },
    {
      question: "Which method removes the last element from an array?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      correct: 0,
      explanation: "pop() removes the last element and returns it."
    },
    {
      question: "What is closure in JavaScript?",
      options: ["A function with access to outer scope", "A closed function", "A loop", "An error type"],
      correct: 0,
      explanation: "A closure is a function that has access to variables in its outer scope."
    },
    {
      question: "Which is not a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Django"],
      correct: 3,
      explanation: "Django is a Python framework, not JavaScript."
    },
    {
      question: "What does 'typeof null' return?",
      options: ["null", "undefined", "object", "string"],
      correct: 2,
      explanation: "This is a historical bug in JavaScript - typeof null returns 'object'."
    },
    {
      question: "What is the correct way to check if 'x' is an array?",
      options: ["typeof x === 'array'", "x.isArray()", "Array.isArray(x)", "x instanceof Array"],
      correct: 2,
      explanation: "Array.isArray(x) is the reliable way to check for arrays."
    },
    {
      question: "What is the difference between '==' and '==='?",
      options: ["No difference", "Type coercion", "Performance", "Syntax error"],
      correct: 1,
      explanation: "'==' allows type coercion, while '===' requires strict equality."
    },
    {
      question: "What is a promise in JavaScript?",
      options: ["A guarantee", "Async operation handler", "A function", "An error"],
      correct: 1,
      explanation: "A promise represents the eventual completion of an async operation."
    },
    {
      question: "What is the event loop?",
      options: ["A loop in code", "Async handling mechanism", "DOM event", "Error handler"],
      correct: 1,
      explanation: "Event loop handles asynchronous callbacks in JavaScript."
    },
    {
      question: "What is hoisting?",
      options: ["Lifting variables", "Moving declarations to top", "Error", "Loop"],
      correct: 1,
      explanation: "Hoisting moves declarations to the top of their scope."
    },
    {
      question: "What is 'this' keyword?",
      options: ["Current object", "Previous object", "Window", "Document"],
      correct: 0,
      explanation: "'this' refers to the current execution context."
    },
    {
      question: "What is JSON?",
      options: ["JavaScript Object Notation", "Java Object Name", "JSON Object Name", "JavaScript Online"],
      correct: 0,
      explanation: "JSON stands for JavaScript Object Notation."
    },
    {
      question: "What is an IIFE?",
      options: ["Immediately Invoked Function Expression", "International Function", "Inline Function", "Error"],
      correct: 0,
      explanation: "IIFE runs immediately after definition."
    },
    // MongoDB Questions (15-29)
    {
      question: "What type of database is MongoDB?",
      options: ["SQL Database", "NoSQL Database", "Graph Database", "Key-Value Store"],
      correct: 1,
      explanation: "MongoDB is a NoSQL document database."
    },
    {
      question: "What is the basic unit of storage in MongoDB?",
      options: ["Table", "Document", "Row", "Column"],
      correct: 1,
      explanation: "MongoDB stores data in flexible, JSON-like documents."
    },
    {
      question: "Which command is used to insert a document?",
      options: ["insertOne()", "addOne()", "push()", "create()"],
      correct: 0,
      explanation: "insertOne() is used to insert a single document."
    },
    {
      question: "What is MongoDB's query language called?",
      options: ["SQL", "MQL (MongoDB Query Language)", "NoSQL", "JSON"],
      correct: 1,
      explanation: "MongoDB Query Language (MQL) is used to query documents."
    },
    {
      question: "Which operator is used for equality in MongoDB?",
      options: ["$eq", "$equal", "$=", "$is"],
      correct: 0,
      explanation: "$eq is the equality operator in MongoDB."
    },
    {
      question: "What is indexing in MongoDB?",
      options: ["Table of contents", "Data structure for faster queries", "Database backup", "Data validation"],
      correct: 1,
      explanation: "Indexes support efficient execution of queries in MongoDB."
    },
    {
      question: "Which method is used to update a document?",
      options: ["updateOne()", "changeOne()", "modifyOne()", "editOne()"],
      correct: 0,
      explanation: "updateOne() is used to update a single document."
    },
    {
      question: "What is a collection in MongoDB?",
      options: ["Group of databases", "Group of documents", "Group of tables", "Group of rows"],
      correct: 1,
      explanation: "A collection is a grouping of MongoDB documents."
    },
    {
      question: "What is the default port for MongoDB?",
      options: ["27017", "3306", "5432", "8080"],
      correct: 0,
      explanation: "MongoDB runs on port 27017 by default."
    },
    {
      question: "What is BSON?",
      options: ["Binary JSON", "Big JSON", "Byte JSON", "Basic JSON"],
      correct: 0,
      explanation: "BSON is Binary JSON, used by MongoDB for data storage."
    },
    {
      question: "Which operator is used for 'and' in MongoDB?",
      options: ["$and", "$or", "$not", "$nor"],
      correct: 0,
      explanation: "$and joins query clauses with logical AND."
    },
    {
      question: "What is sharding in MongoDB?",
      options: ["Breaking data", "Distributing data across servers", "Backup", "Indexing"],
      correct: 1,
      explanation: "Sharding distributes data across multiple machines."
    },
    {
      question: "What is replication in MongoDB?",
      options: ["Copying data", "Syncing data across servers", "Backup", "All of above"],
      correct: 3,
      explanation: "Replication provides redundancy and increases data availability."
    },
    {
      question: "Which method deletes documents?",
      options: ["deleteOne()", "removeOne()", "dropOne()", "eraseOne()"],
      correct: 0,
      explanation: "deleteOne() removes a single document from a collection."
    },
    {
      question: "What is Mongoose?",
      options: ["Database", "ODM library", "Query tool", "Server"],
      correct: 1,
      explanation: "Mongoose is an ODM (Object Document Mapper) for MongoDB and Node.js."
    }
  ];

  // Randomly select 15 questions when component loads
  useEffect(() => {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 15);
    setQuestions(selected);
  }, []);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setAnswers([...answers, {
      question: questions[currentQuestion].question,
      selected: selectedOption,
      correct: questions[currentQuestion].correct,
      explanation: questions[currentQuestion].explanation
    }]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    // Reshuffle questions on restart
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 15);
    setQuestions(selected);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswers([]);
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '40px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  };

  // Show loading while questions are being selected
  if (questions.length === 0) {
    return <div style={containerStyle}>Loading questions...</div>;
  }

  if (showScore) {
    const percentage = (score / questions.length) * 100;
    let message = '';
    let emoji = '';

    if (percentage >= 80) { message = 'Excellent!'; emoji = '🌟'; }
    else if (percentage >= 60) { message = 'Good job!'; emoji = '👍'; }
    else if (percentage >= 40) { message = 'Keep practicing!'; emoji = '📚'; }
    else { message = 'Better luck next time!'; emoji = '💪'; }

    return (
      <div style={containerStyle}>
        <h2 style={{
          fontSize: '2.5em',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px'
        }}>
          Quiz Complete! {emoji}
        </h2>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '40px',
          borderRadius: '15px',
          marginBottom: '30px'
        }}>
          <p style={{ fontSize: '1.3em', color: '#666' }}>{message}</p>
          <p style={{ fontSize: '4em', color: '#667eea', fontWeight: 'bold', margin: '20px 0' }}>
            {score}/{questions.length}
          </p>
          <p style={{ fontSize: '1.2em', color: '#666' }}>
            {percentage.toFixed(1)}% Correct
          </p>
        </div>

        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>📊 Detailed Results:</h3>
          {answers.map((ans, idx) => (
            <div key={idx} style={{
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: ans.selected === ans.correct ? '#e8f5e8' : '#ffebee',
              borderRadius: '8px',
              borderLeft: `5px solid ${ans.selected === ans.correct ? '#4CAF50' : '#f44336'}`
            }}>
              <p style={{ fontWeight: 'bold', color: '#333' }}>{idx + 1}. {ans.question}</p>
              <p style={{ color: '#666', fontSize: '0.9em' }}>{ans.explanation}</p>
            </div>
          ))}
        </div>

        <button
          onClick={restartQuiz}
          style={{
            padding: '15px 40px',
            fontSize: '1.2em',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Try Different Questions 🔄
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
      }}>
        <span style={{ fontSize: '1.1em', color: '#667eea', fontWeight: 'bold' }}>
          Question {currentQuestion + 1}/{questions.length}
        </span>
        <span style={{ fontSize: '1.1em', color: '#4CAF50', fontWeight: 'bold' }}>
          Score: {score}
        </span>
      </div>

      <h2 style={{
        color: '#333',
        marginBottom: '40px',
        fontSize: '1.8em',
        lineHeight: '1.4'
      }}>
        {questions[currentQuestion].question}
      </h2>

      <div style={{ display: 'grid', gap: '15px', marginBottom: '40px' }}>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            style={{
              padding: '20px',
              fontSize: '1.1em',
              backgroundColor: selectedOption === index ? '#667eea' : '#f8f9fa',
              color: selectedOption === index ? 'white' : '#333',
              border: '2px solid',
              borderColor: selectedOption === index ? '#667eea' : '#e0e0e0',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              if (selectedOption !== index) {
                e.target.style.backgroundColor = '#e9ecef';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedOption !== index) {
                e.target.style.backgroundColor = '#f8f9fa';
              }
            }}
          >
            <span style={{
              display: 'inline-block',
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              backgroundColor: selectedOption === index ? 'white' : '#ddd',
              color: selectedOption === index ? '#667eea' : 'white',
              textAlign: 'center',
              lineHeight: '25px',
              marginRight: '15px',
              fontWeight: 'bold'
            }}>
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextQuestion}
        disabled={selectedOption === null}
        style={{
          padding: '15px 50px',
          fontSize: '1.2em',
          backgroundColor: selectedOption === null ? '#ccc' : '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: selectedOption === null ? 'not-allowed' : 'pointer',
          opacity: selectedOption === null ? 0.7 : 1,
          transition: 'transform 0.3s',
          boxShadow: selectedOption === null ? 'none' : '0 5px 20px rgba(102, 126, 234, 0.4)'
        }}
        onMouseEnter={(e) => {
          if (selectedOption !== null) {
            e.target.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (selectedOption !== null) {
            e.target.style.transform = 'scale(1)';
          }
        }}
      >
        {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
}

function Navbar() {
  const navStyle = {
    backgroundColor: '#333',
    padding: '15px',
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 20px',
    fontSize: '1.2em',
    padding: '8px 16px',
    borderRadius: '5px',
    transition: 'background-color 0.3s'
  };

  return (
    <nav style={navStyle}>
      <Link
        to="/"
        style={linkStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        🏠 Home
      </Link>
      <Link
        to="/quiz"
        style={linkStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        📝 Take Quiz
      </Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;