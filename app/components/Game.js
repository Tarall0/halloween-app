import  { useState, useEffect } from "react";

export default function Game() {
  const [username, setUsername] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [weapon, setWeapon] = useState("");
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);

  const getQuestionText = (index) => {

    if (index === 1) {
      return `What a nice name, ${username || "Player"}! What class would you like to choose?`;
    } else if (index === 2) {
      return `I understand you chose ${characterClass}. Now let's start our adventure!`
    } else if (index === 4) {
      return `You wake up unconscious in a room with some weapons. What do you choose, ${username || "Player"}?`;
    } else if(index === 5) {
      return `You chose a ${weapon}. That will help us during our adventure.`;
    } else {
      return questions[index];
    }
  };

  const questions = [
    "Welcome to this mini game! What's your username?",
    "What class would you like to choose?",
    "I understand. Now let's start our adventure!",
    "...",
    "You wake up unconscious in a room with some weapons. What do you choose",
    "Nice weapon!",
  ];

  

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const question = getQuestionText(currentQuestionIndex);
  
      setIsTyping(true);
      setDisplayText("");
  
      const delay = 60;
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
  

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    if (currentQuestionIndex === 0 || currentQuestionIndex === 2 || currentQuestionIndex === 3 || currentQuestionIndex === 5) {
      setUsername(event.target.value);
    }
    
    if (currentQuestionIndex === 1) {
      setCharacterClass(event.target.value);
    }
    
    if (currentQuestionIndex === 4) {
      setWeapon(event.target.value);
    } 
  };
  

  const handleChoiceClick = (choice, index) => {
    setSelectedChoiceIndex(index);
  
    if (currentQuestionIndex === 4) {
      // If this is the weapon selection
      setWeapon(choice);
      handleNextQuestion();
    } else {
      // Else for now it will be the character class selection
      setCharacterClass(choice);
      handleNextQuestion();
    }
  };

  
  const handleNextQuestion = () => {
    const currentQuestion = getQuestionText(currentQuestionIndex);
  
    if (currentQuestionIndex === 0 && username) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: username },
      ]);
      setCurrentQuestionIndex(1);
      setChoices(["🤵 Human", "🧙‍♀️ Witch", "🧛 Vampire", "👻 Ghost"]);
    } else if (currentQuestionIndex === 1 && characterClass) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: characterClass },
      ]);
      setCurrentQuestionIndex(2);
      setChoices([]);
    } else if (currentQuestionIndex === 2) {
      setChatHistory([...chatHistory, { question: currentQuestion }]);
      setCurrentQuestionIndex(3);
    } else if (currentQuestionIndex === 3) {
      setChatHistory([...chatHistory, { question: currentQuestion }]);
      setCurrentQuestionIndex(4);
      setChoices(["🧪 Potion", "🔫 Gun", "🗡️ Sword", "💎 Rock"]);
    } else if (currentQuestionIndex === 4 && weapon) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: weapon },
      ]);
      setCurrentQuestionIndex(5);
    }
  };
  

  return (
    <div className="game">
      <div className="game-box">
        <div className="game-head">
          <h3>Question</h3>
          <div className="question">
            <span className="typing-effect">{displayText}</span>
          </div>
          <div className="user-response">
            {currentQuestionIndex === 1 || currentQuestionIndex === 2 || currentQuestionIndex === 3 || currentQuestionIndex === 4 || currentQuestionIndex === 5 ? (
              <div className="questions-buttons">
                {choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoiceClick(choice, index)}
                    disabled={isTyping}
                    className={selectedChoiceIndex === index ? "selected" : ""}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                placeholder="Your response"
                value={inputText}
                onChange={handleInputChange}
                disabled={isTyping}
                className="user-input"
              />
            )}
            <div className="submit-button">
              <button onClick={handleNextQuestion} disabled={isTyping || !inputText}>
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="game-textarea">
          <div className="chat-history">
            <h3>💬 Chatlog</h3>
            {chatHistory.slice().reverse().map((chat, index) => (
              <div key={index}>
                <div className="chat-bot">{chat.question}</div>
                {chat.answer ? (
                  <div className="chat-user">{chat.answer}</div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
