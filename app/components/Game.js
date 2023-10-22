import  { useState, useEffect } from "react";

export default function Game() {
  const [userLife, setUserLife] = useState(3);
  const [username, setUsername] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [weapon, setWeapon] = useState("No weapon");
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [userChoice, setUserChoice] = useState("");
  const hearts = Array(userLife).fill('❤️');
  const [enemy, setEnemy] = useState("");
  const [enemyLife, setEnemyLife] = useState(10);
  const [attack, setAttack] = useState("1"); // Minimum attack value (for no weapon cases) set to 1
  const [enemyAttack, setEnemyAttack] = useState("");

  const enemies = [
    "🧟 ZOMBIE",
    "🧌 CORRUPTED WITCH",
    "👹 WANDERING SPIRIT",
    "🐺 EVIL WEREWOLF",
  ]


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
      return `You suddenly wake up confused in a dark room. What do you do, ${username || "Player"}?`;
    } else if (index === 7) {
      return `You decided to ${userChoice}. You find some weapons. Which one do you chose?`;
    }else if(index === 8) {
      return `You chose a ${weapon}. That will help us during our adventure.`;
    } else if(index === 12) {
      return `Oh no! ${username} you encounter a ${enemy} (${enemyLife} life points)! What will you do?`;
    } else if(index === 13) {
      return `Hurry up ${username} and do something before we get attacked!`;
    } else if(index === 14) {
      return `Well played ${username}! Your hit inflicted ${attack} damage on the ${enemy}.`;
    } else if(index === 15) {
      return `Oh no, ${enemy} (${enemyLife} life points) gets angry and hits you. `;
    }else if(index === 16) {
      return `${enemy} hurls himself at you, luckily you manage to dodge in time. However, this inflicts ${enemyAttack} damage on you.`;
    }else if(index === 17) {
      return `${enemy} is in front of you and it is about to get up from the ground! Hurry up ${username}, what do you choose to do?`;
    }else if(index === 18) {
      return `${enemy} is still alive (${enemyLife} life points)! It suddenly attacks you!`;
    } else if(index === 19) {
      return `${enemy} fails to hit you. It inflicts ${enemyAttack} damage on you!`;
    } else if(index === 20) {
      return `${enemy} is still alive (${enemyLife} life points). What do you want to do ${username}?`;
    }else if(index === 21) {
      return `Great! You inflicted ${attack} damage.`;
    }else if(index === 22) { // If user is dead
      return `Oh no ${username}. ${enemy} is assailed by anger. It suddenly attacks you. You lose consciousness. ${enemy} defeated you.`;
    }else if(index === 23) { // If user defeat enemy
      return `Well done ${username}! ${enemy} has been defeated.`;
    }else if(index === 24) { // if escaped
      return `You managed to escape this time...`;
    }else if(index === 25) { // Going out the fight 
      return `You notice that in the northeast direction you can see smoke, as if someone has lit a fire. You decide to head to that area.`;
    }else {
      return questions[index];
    }
  };

  const questions = [
    "Welcome to this mini game! What's your username?",
    "Your goal is this",
    "You don't remember that much. As far as we know, the Earth has been destoryed — Or almost destroyed.",
    "What class would you like to choose?",
    "I understand. Now let's start our adventure!",
    "...",
    "You wake up unconscious in a dark room. What do you do?",
    "You choose weapon",
    "Nice weapon!",
    "You find the exit and are out of the building.",
    "You see ahead of you destroyed buildings, everything looks abandoned. You see on the horizon the sunset. It is almost evening.",
    "Wait a moment--do you hear that? Where is it coming from?!",
    "first enemy",
    "first action fight",
    "action result",
    "Enemy action",
    "User receives damage",
    "User second action",
    "Is enemy dead?",
    "Enemy second action",
    "Last chance to beat enemy",
    "If enemy still alive",
    "User last action",
    "If user Dead",
    "If enemy beaten",
    "You go out the fight",
    "If escaped ",
    "If fight ended",
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
    if (currentQuestionIndex === 6 || currentQuestionIndex === 12 || currentQuestionIndex === 13) {
      setUserChoice(event.target.value);
    } 
    if (currentQuestionIndex === 7) {
      setWeapon(event.target.value);
    } 
  };
  

  const handleChoiceClick = (choice, index) => {
    setSelectedChoiceIndex(index);

    if (currentQuestionIndex === 6 || currentQuestionIndex === 12) {
      //
      setUserChoice(choice);
      
    } else if (currentQuestionIndex === 13 || currentQuestionIndex === 17  || currentQuestionIndex === 20) {
      setUserChoice(choice);
      if (choice === "Kick") {
        // Define damage for the Kick action
        const kickDamage = 3;
        setEnemyLife(enemyLife - kickDamage);
        setAttack(kickDamage);
        
      } else if (choice === "Punch") {
        // Define damage for the Punch action
        const punchDamage = 2;
        setEnemyLife(enemyLife - punchDamage);
        setAttack(punchDamage);
      } else if (choice === weapon) {
        // Implement logic for using the user's weapon
        // Define damage for the weapon action
        const weaponDamage = 5; 
        setAttack(weaponDamage);
        
        setEnemyLife(enemyLife - weaponDamage);
      } else if (choice === "Escape") {
        setChoices([]);
        setCurrentQuestionIndex(24);
        
      }

    }
    else if (currentQuestionIndex === 7) {
      // If this is the weapon selection
      setWeapon(choice);
    } else { 
      // Else for now it will be the character class selection
      setCharacterClass(choice);
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
      setChoices([]);
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
        setCurrentQuestionIndex(9); // Move to index 9
      }
    } else if (currentQuestionIndex === 7 && weapon) {
      // Handle weapon selection
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: weapon },
      ]);
      setCurrentQuestionIndex(8);
      setChoices([]);
    } else if (currentQuestionIndex === 8) {
      // Handle the next question after selecting a weapon
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion },
      ]);
      setCurrentQuestionIndex(9);
    } else if (currentQuestionIndex === 9) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion },
      ]);
      setCurrentQuestionIndex(10);
    } else if (currentQuestionIndex === 10) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion },
      ]);
      setCurrentQuestionIndex(11);
    } else if (currentQuestionIndex === 11) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion },
      ]);
      setCurrentQuestionIndex(12);
      // First enemy encounter
      const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
      const randomEnemyLife = Math.floor(Math.random() * 10 + 5);
      setEnemyLife(randomEnemyLife);
      setEnemy(randomEnemy);
      setChoices(["🏃 Escape", "🤺 Fight"]);
    } else if (currentQuestionIndex === 12) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: userChoice },
      ]);
      if(userChoice === "🤺 Fight") {
        setCurrentQuestionIndex(13);
      } else if (userChoice === "🏃 Escape") {
        setCurrentQuestionIndex(24);
        setChoices([]);
      }
      setChoices([`Kick`, `Punch`, `${weapon}`, `Escape`]);
    } else if (currentQuestionIndex === 13) {
        setChatHistory([
          ...chatHistory,
          { question: currentQuestion, answer: userChoice },
        ]);
      setCurrentQuestionIndex(14); 
      setChoices([]);
    } else if (currentQuestionIndex === 14) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,  },
      ]);
    setCurrentQuestionIndex(15); 
    } else if (currentQuestionIndex === 15) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,  },
      ]);
      // Enemy Attack
      const randomAttack = Math.floor(Math.random() * 2 + 1);
    setEnemyAttack(randomAttack);
    setUserLife(userLife - randomAttack);
    setCurrentQuestionIndex(16); 
    } else if (currentQuestionIndex === 16) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,  answer:`${userLife} life points left`},
      ]);
    setCurrentQuestionIndex(17);
    setChoices([`Kick`, `Punch`, `${weapon}`, `Escape`]);
    } else if (currentQuestionIndex === 17) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,  answer: userChoice},
      ]);
      if(enemyLife <= 0){
        setCurrentQuestionIndex(23);
      } else {
        // Enemy 2nd Attack
        const randomAttack = Math.floor(Math.random() * 2);
        setEnemyAttack(randomAttack);
        setUserLife(userLife - randomAttack);
        setCurrentQuestionIndex(18);
      }
      setChoices([]);
    } else if (currentQuestionIndex === 18){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,  answer:`${userLife} life points left`},
      ]);
      if(userLife <= 0) {
        setCurrentQuestionIndex(22);
      } else {
        setCurrentQuestionIndex(19);
      }
      
    } else if (currentQuestionIndex === 19) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setChoices([`Kick`, `Punch`, `${weapon}`, `Escape`]);
      setCurrentQuestionIndex(20); 
    } else if (currentQuestionIndex === 20) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,  answer: userChoice},
      ]);
      if(enemyLife <= 0){
        setCurrentQuestionIndex(23);
      } else {
        // Enemy 2nd Attack
        const randomAttack = Math.floor(Math.random() * 2);
        setEnemyAttack(randomAttack);
        setUserLife(userLife - randomAttack);
        setCurrentQuestionIndex(21);
      }
      setChoices([]);
    } else if (currentQuestionIndex === 21){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]);
      if(userLife <= 0) {
        setCurrentQuestionIndex(22);
      } else {
        setCurrentQuestionIndex(23);
      }
    }  else if (currentQuestionIndex === 22){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]); // User is defeated case
      setCurrentQuestionIndex(22);
    } else if (currentQuestionIndex === 23){
      // Enemy is defeated
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]);
      setCurrentQuestionIndex(25);
    } else if (currentQuestionIndex === 24){
      setChoices([]);
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]);
      setCurrentQuestionIndex(25);
    } 
  };
  

  return (
    <div className="game">
      <div className="game-box">
        <div className="game-head">
          {characterClass ? (<div className="user-info">
            <p className="user-basic"><b>{username}</b> — {characterClass}
            </p>
            <p className="user-life">
              {hearts.map((heart, index) => (
                <span key={index} className="heart-emoji">
                  {heart}
                </span>
              ))}
            </p>
          </div>) : ("")}
          <div className="question">
            <span className="typing-effect">{displayText}</span>
          </div>
          <div className="user-response">
            {currentQuestionIndex === 1 || currentQuestionIndex === 2 || currentQuestionIndex === 3 || currentQuestionIndex === 4 || currentQuestionIndex === 5 || currentQuestionIndex === 6 || currentQuestionIndex === 7 || currentQuestionIndex === 8 || currentQuestionIndex === 9 || currentQuestionIndex === 10 || currentQuestionIndex === 11 || currentQuestionIndex === 12 || currentQuestionIndex === 13 || currentQuestionIndex === 14 || currentQuestionIndex === 15 || currentQuestionIndex === 16 || currentQuestionIndex === 17 || currentQuestionIndex === 18 || currentQuestionIndex === 19 || currentQuestionIndex === 20 || currentQuestionIndex === 21 || currentQuestionIndex === 22 || currentQuestionIndex === 23 || currentQuestionIndex === 24? (
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
              <button 
                onClick={handleNextQuestion} 
                disabled={isTyping || !inputText || currentQuestionIndex === 22}>
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
                {chat.answer ? (
                  <div className="chat-user">{chat.answer}</div>
                ) : (
                  ""
                )}
                <div className="chat-bot">{chat.question}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
