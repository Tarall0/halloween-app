import React, { useState, useEffect } from "react";

export default function Game() {
  const [username, setUsername] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const questions = [
    "Welcome to this mini RPG game! What's your username?",
    "What class would you like to choose? (Warrior, Mage, Rogue)",
    "test"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];

      // Simulate a typing effect for the current question
      setIsTyping(true);
      setDisplayText("");

      const delay = 70; 
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= question.length) {
          setDisplayText(question.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, delay);
    }
  }, [currentQuestionIndex]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    if (currentQuestionIndex === 0) {
      setUsername(text);
    } else if (currentQuestionIndex === 1) {
      setCharacterClass(text);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === 0 && username) {
      setChatHistory([
        ...chatHistory,
        { question: questions[currentQuestionIndex], answer: username },
      ]);
      setCurrentQuestionIndex(1);
    } else if (currentQuestionIndex === 1 && characterClass) {
      setChatHistory([
        ...chatHistory,
        { question: questions[currentQuestionIndex], answer: characterClass },
      ]);


      // Move on to the next question or end the conversation
      if (currentQuestionIndex === questions.length - 1) {
        // End the conversation
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  return (
    <>

<div className="game-menu">
        <button>Start</button>
        <button>Info</button>
        <button>Exit</button>
      </div>
    <div className="game-box">

        <div className="question">
        <span className="typing-effect">{displayText}</span>
        </div>
        <div className="user-response">
        <input
          type="text"
          placeholder="Your response"
          value={currentQuestionIndex === 0 ? username : characterClass}
          onChange={handleInputChange}
          disabled={isTyping}
          className="user-input"
        />
        
        <button onClick={handleNextQuestion} disabled={isTyping || !inputText}>
          Next
        </button>
        </div>
      
      <div className="game-textarea">
       <div className="chat-history">
       {chatHistory.map((chat, index) => (
          <div key={index}>
            <div className="chat-bot">{chat.question}</div>
            <div className="chat-user">{chat.answer}</div>
          </div>
        ))}
       </div>
      </div>
    </div>
    
    </>
  );
}
