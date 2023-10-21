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
  const [userChoice, setUserChoice] = useState("");

  const goals = [
    "to destroy all the zobies on Earth",
    "to revenge your family killed by humans",
    "to survive the apocalypse",
    "to return to the life before the apocalypse happened"
  ]

  const goal = goals[Math.floor(Math.random() * goals.length)];

  const getQuestionText = (index) => {

    if (index === 1) {
      return `What a nice name, ${username || "Player"}! For this session, your main goal will be ${goal}.`
    } else if (index === 3) {
      return `What class would you like to choose?`;
    } else if (index === 4) {
      return `I understand you chose to be a ${characterClass}. Now let's start our adventure!`
    } else if (index === 6) {
      return `You wake up unconscious in a room with dark room. What do you do, ${username || "Player"}?`;
    } else if (index === 7) {
      return `You decided to ${userChoice}. You find some weapons. Which one do you chose?`;
    }else if(index === 8) {
      return `You chose a ${weapon}. That will help us during our adventure.`;
    } else {
      return questions[index];
    }
  };

  const questions = [
    "Welcome to this mini game! What's your username?",
    "Your goal is this",
    "You don't remember that much. As far as we know, the Earth has been destoryed -- Or almost destroyed.",
    "What class would you like to choose?",
    "I understand. Now let's start our adventure!",
    "...",
    "You wake up unconscious in a dark room. What do you do?",
    "You choose weapon",
    "Nice weapon!",
    "You find the exit "
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
    if (currentQuestionIndex === 0 || currentQuestionIndex === 1 ||currentQuestionIndex === 2 || currentQuestionIndex === 3 || currentQuestionIndex === 5) {
      setUsername(event.target.value);
    }
    
    if (currentQuestionIndex === 3) {
      setCharacterClass(event.target.value);
    }
    if (currentQuestionIndex === 6) {
      setUserChoice(event.target.value);
    } 
    if (currentQuestionIndex === 7) {
      setWeapon(event.target.value);
    } 
  };
  

  const handleChoiceClick = (choice, index) => {
    setSelectedChoiceIndex(index);

  
    if (currentQuestionIndex === 6) {
      // If this is the weapon selection
      setUserChoice(choice);
      handleNextQuestion();
    } else if (currentQuestionIndex === 7) {
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
    } else if (currentQuestionIndex === 1) {
      setChatHistory([...chatHistory, { question: currentQuestion }]);
      setCurrentQuestionIndex(2);
    } else if (currentQuestionIndex === 2) {
      setChatHistory([...chatHistory, { question: currentQuestion }]);
      setCurrentQuestionIndex(3);
      setChoices(["🤵 Human", "🧙‍♀️ Witch", "🧛 Vampire", "👻 Ghost"]);
    } else if (currentQuestionIndex === 3 && characterClass) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: characterClass },
      ]);
      setCurrentQuestionIndex(4);
      setChoices([]);
    } else if (currentQuestionIndex === 4) {
      setChatHistory([...chatHistory, { question: currentQuestion }]);
      setCurrentQuestionIndex(5);
    } else if (currentQuestionIndex === 5) {
      setChatHistory([...chatHistory, { question: currentQuestion }]);
      setCurrentQuestionIndex(6);
      setChoices(["keep exploring", "follow the light and exit the room"]);
    } else if (currentQuestionIndex === 6) {
      setChatHistory([...chatHistory, { question: currentQuestion }]);
  
      if (userChoice === "keep exploring") {
        // User chose to keep exploring
        setChatHistory([
          ...chatHistory,
          { question: currentQuestion, answer: userChoice },
        ]);
  
        setCurrentQuestionIndex(7);
        setChoices(["🧪 Potion", "🔫 Gun", "🗡️ Sword", "💎 Rock"]);
      } else if (userChoice === "follow the light and exit the room") {
        // User chose to follow the light and exit the room
        setChatHistory([
          ...chatHistory,
          { question: currentQuestion, answer: userChoice },
        ]);
  
        setCurrentQuestionIndex(9); // Adjust as needed for the next question or scenario
      }
    } else if (currentQuestionIndex === 7 && weapon) {
      // Handle weapon selection
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: weapon },
      ]);
      setCurrentQuestionIndex(8); // Move on to the next question after selecting a weapon
    } else if (currentQuestionIndex === 8) {
      // Handle the next question or scenario after selecting a weapon
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion },
      ]);
      setCurrentQuestionIndex(9); // Move to the next question or scenario
    }
  };
  

  return (
    <div className="game">
      <div className="game-box">
        <div className="game-head">
          <h3>Mini Game</h3>
          <div className="question">
            <span className="typing-effect">{displayText}</span>
          </div>
          <div className="user-response">
            {currentQuestionIndex === 1 || currentQuestionIndex === 2 || currentQuestionIndex === 3 || currentQuestionIndex === 4 || currentQuestionIndex === 5 || currentQuestionIndex === 6 || currentQuestionIndex === 7 ? (
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
                {isTyping ? "Writing... " : "Next"}
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
