import  { useState, useEffect, useRef } from "react";

export default function Game() {
  const [maxUserLife, setMaxUserLife] = useState(1);
  const [userLife, setUserLife] = useState(1);
  const [username, setUsername] = useState("");
  const [goal, setGoal] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [weapon, setWeapon] = useState("No weapon");
  const [weaponDesc, setWeaponDesc] = useState("");
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
  const [basicAttack, setBasicAttack] = useState(1);
  const [attack, setAttack] = useState(); 
  const [enemyAttack, setEnemyAttack] = useState("");
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState();
  const [maxXPForNextLevel, setMaxXPForNextLevel] = useState(100);
  const [randomAnimal, setRandomAnimal] = useState("");
  const [blessing, setBlessing] = useState();
  const [xpModifier, setXpModifier] = useState(1);
  const [hasLeveled, setHasLeveled] = useState(false);
  const [classPower, setClassPower] = useState("");

  const [doorSound, setDoorSound] = useState(false);
  const doorRef = useRef(null);
  const enemyRef = useRef(null);
  const punchRef = useRef(null);
  const biteRef = useRef(null);
  const ghostatkRef = useRef(null);
  const magicRef = useRef(null);
  const zombieRef = useRef(null);
  const witchRef = useRef(null);
  const wolfRef = useRef(null);
  const spiritRef = useRef(null);
  const owlRef = useRef(null);
  const snakeRef = useRef(null);
  const mouseRef = useRef(null);



  const playDoorSound = () => {
    console.log("Reach function")
    setDoorSound(true);
    if (doorRef.current) {
      doorRef.current.load();
      console.log("Playing osund...")
      doorRef.current.play();
    }
  }

  const playEnemySound = () => {
    if(enemyRef.current){
      enemyRef.current.play();
    }
  }

  const playBiteSound = () => {
    if(biteRef.current){
      biteRef.current.play();
    }
  }

  const playMagicSound = () => {
    if(magicRef.current){
      magicRef.current.play();
    }
  }

  const decreaseLife = (amount) => {
    if (userLife > 0) {
      let newLife = userLife - amount;
      let blackHeartsnr = maxUserLife - newLife;
      setUserLife(newLife);
    } else if (userLife < 0) {
      setUserLife(0);
    }
  };

  const gainLife = (amount) => {
    if(userLife < maxUserLife){
      const newLife = userLife + amount;
      setUserLife(newLife);
    } else {
      setUserLife(maxUserLife);
    }
  }

  const gainXP = (xpAmount) => {
    let updatedXP = userXP + (xpAmount * xpModifier);
    
    if (updatedXP >= maxXPForNextLevel) {
      // Calculate the number of level ups based on the accumulated XP
      const levelUps = Math.floor(updatedXP / maxXPForNextLevel);
      setHasLeveled(true);
      
      // Level up for each level achieved
      for (let i = 0; i < levelUps; i++) {
        // Level up
        setUserLevel(userLevel + 1);
        let newMaxLife = maxUserLife + 1;
        setMaxUserLife(newMaxLife);
        setUserLife(newMaxLife);

        // Reset the actual xp of the user 
        updatedXP -= maxXPForNextLevel;
        
        // Increase the required XP for the next level
        setMaxXPForNextLevel(maxXPForNextLevel * 1.5);
      }
    }
    
    // Update the user's XP with the remaining XP
    setUserXP(updatedXP);

    // Show level up notification 

    setTimeout(() => {
      setHasLeveled(false);
    }, 3000)
  };
  
  const enemies = [
    "🧟 ZOMBIE",
    "🧌 CORRUPTED WITCH",
    //"👹 WANDERING SPIRIT",
    "🐺 EVIL WEREWOLF",
  ]

  const animal = [
    "🦉 Owl",
    "🐁 Mouse",
    "🐍 Snake",
  ]

  const goals = [
    "to destroy all the zombies on Earth",
    "to revenge your family killed by humans",
    "to survive the apocalypse",
    "to return to the life before the apocalypse happened",
    "to create a family despite the recent destruction of the Earth.",
    "to rebuild civilization.",
    "to become a god",
    "just to finish this game."
  ]

  const randomGoal = goals[Math.floor(Math.random() * goals.length)];
  
  
  

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
      return `You chose a ${weapon}. ${weaponDesc}.`;
    } else if(index === 12) {
      return `Oh no! ${username} you encounter a ${enemy} (lvl ${(enemyLife % 2) + 1}, ${enemyLife} life points)! What will you do?`;
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
    }else if(index === 22) { // If user is dead because of the fight
      return `Oh no ${username}. ${enemy} is assailed by anger. It suddenly attacks you. You lose consciousness. ${enemy} defeated you.`;
    }else if(index === 23) { // If user defeat enemy
      return `Well done ${username}! ${enemy} has been defeated. (${attack} damages inflicted from from last hit)`;
    }else if(index === 24) { // if escaped
      return `You managed to escape this time...`;
    }else if(index === 25) { // Going out the fight 
      return `You notice that in the northeast direction you can see smoke, as if someone has lit a fire. You decide to head to that area.`;
    }else if(index === 26) { // while walking to second scenario
      return `What you see around, ${username}, is horrible. All the buildings around are half-destroyed, and there is not a (living) soul around. The sun is almost set completely.`;
    }else if(index === 28) { // User easter egg
      return `It seems to be a ${randomAnimal}. Maybe it is injured. What do you decide to do?`;
    }else if(index === 29) { // User easter egg
      return `You chose to care for the animal. What a nice gesture. ${randomAnimal} stands up and watches you. Suddenly it is enveloped in a magnificent light, takes the form of a spirit.`;
    }else if(index === 31) { // User blessing
      return `${blessing}`;
    }else if(index === 35) { // User decide to explore further
      return `I like your adventurous spirit ${username}. Let's go and see.`;
    }else if (index === 45) {
      return `I understand you have decided to accept ${weapon}. It gives off a powerful energy...`
    }else if (index === 46) {
      return `<< Well, now ${username} I would like to be left alone. I'll smoke a few joints and meditate on what to do. It's been a pleasure to meet you. >>`
    }else if (index === 47) {
      return `You turn your back on the old woman, who hardly noticed you move, and continue on your way.`
    } else if (index === 49) {
      return `A menacing figure steps out from the shadows, its eyes glinting with malicious intent as it readies for combat.`
    } else if (index === 50) {
      return `A ${enemy} (lvl ${(enemyLife % 2) + 1}, ${enemyLife} life points) appear! What will you do?`
    }else if (index === 51) {
      return `${username} we are currently developing this game. Come back later.`
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
    "... ... ...",
    "You wake up unconscious in a dark room. What do you do?",
    "If explore choose weapon",
    "Nice weapon!",
    "You find the exit and are out of the building.", //9
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
    "if escaped",
    "out of the fight, going to second scenario ",
    "As you walk, what looks like an injured animal crouched by the side of the road catches your attention.",
    "Random animal, user choice",
    "If user chose to help the animal", 
    "Because you helped the poor animal. Here is a blessing for you, choose.", 
    "Your gesture has been blessed by gods",
    "I understand there are more important things at the moment and that you have decided to go ahead...",
    "The sun has gone down. However, the smoke is still present in the same direction and you decide to continue.",
    "The scenario of destruction around you is shocking. Wait a moment. Did you see that light in that abandoned building?",
    "Yes the user see and decide to go", //35
    "As you approach the half-destroyed house, you notice an elderly lady sitting outside, as if waiting for someone.",
    "She immediately turns to face you.",
    "Notice in her face how melancholy is now present in the elderly woman's thoughts at all times.",
    "Poor woman... she must have suffered so much.", // 39
    "<< What happened to me you say? I was a fighting witch for the king's army. After the destruction of this timeline, I went back to find my family. This is what was left... >>",
    "The old woman gets up, shifts her crumpled and badly put on cloak to reveal a shining gold necklace with a sparkling purple stone in the center.",
    "<< This is Evelin's sacred necklace. The first witch in my family. It has been treasured for hundreds of years and would be passed down to one of my children after my death. However, there is none of them left... >>",
    "You certainly have something else on your mind right now.", //43
    "<< Do you want to take this necklace with you? It could allow you to obtain great powers. Or it could be just a piece of gold with a rock. >>",
    "User pick the weapon",
    "Goodbyes",
    "Final convo with the witch",
    "Darkness has now fallen. You keep walking in the direction of the smoke; it seems to be close.", //48
    "Sorry ${username}", //49th
    "Intro second enemy",
    "Second enemy approach",
    
  ];

  const armorSpecials = [
    "This will let you gain two additional hearts",
    "Nice sword! This will let you inflict additional 2 - 12 damage to enemies",
    "Perfect for distance shot! Additional 7 damage to enemies",
    "Mysterious rock. You obtain +1 Heart and x2 XP",
  ]
  

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
    if (currentQuestionIndex === 0 ) {
      setUsername(event.target.value);
    }
  };

  const handleClassModifier = (pgClass) => {
      switch(pgClass){
        case "🤵 Human":
          setMaxUserLife(3);
          setUserLife(3);
          setBasicAttack(1);
          setClassPower("👊 Power Fist");
          break;
        case "🧙‍♀️ Witch":
          setMaxUserLife(2);
          setUserLife(2);
          setBasicAttack(3);
          setClassPower("✨ Magical Hit")
          break;
        case "🧛 Vampire":
          setMaxUserLife(3);
          setUserLife(3);
          setBasicAttack(2);
          setClassPower("🩸 Bite");
          break;
        case "👻 Ghost":
          setMaxUserLife(4);
          setUserLife(4);
          setBasicAttack(1);
          setClassPower("💀 Death Touch");
          break;
      }
  }
  

  const handleChoiceClick = (choice, index) => {
    setSelectedChoiceIndex(index);
  
    switch (currentQuestionIndex) {
      case 6:
      case 11:
      case 12:
      case 28:
      case 29:
      case 30:
      case 34:
      case 35:
      case 39:
      case 42:
      case 44:
        setUserChoice(choice);
        break;
      case 13:
      case 17:
      case 20:
        handleCombatChoice(choice);
        break;
      case 7:
        setWeapon(choice);
        break;
      case 3:
        setCharacterClass(choice)
        handleClassModifier(choice);
        break;
      // Add more cases for other question indexes...
      default:
        break;
    }
  };

  const handleCombatChoice = (choice) => {
    setUserChoice(choice);
  
    switch (choice) {
      case "Kick":
        handleAttack(3 + basicAttack);
        break;
      case "Punch":
        handleAttack(2 + basicAttack);
        break;
      case weapon:
        handleWeaponChoice();
        break;
      case "🩸 Bite":
        handleBite();
        break;
      case "✨ Magical Hit":
        handleMagic();
        break;
      case "Escape":
        setChoices([]);
        setCurrentQuestionIndex(24);
        break;
      default:
        break;
    }
  };

  const handleWeaponChoice = () => {
    switch (weapon) {
      case "🗡️ Sword":
        handleAttack((Math.floor(Math.random() * 10 + 2)) + basicAttack);
        break;
      case "🔫 Gun":
        handleAttack(7 + basicAttack);
        break;
      case "💎 Rock":
        handleAttack(2 + basicAttack);
        break;
      case "📿 Evelin's Necklace":
        handleAttack((Math.floor(Math.random() * 30 + 2)) + basicAttack);
        break;
      default:
        handleAttack(basicAttack);
        break;
    }
  };

  const handleAttack = (damage) => {
    setEnemyLife(enemyLife - damage);
    setAttack(damage);
  };

  const handleBite = () => {
    const biteDamage = (Math.floor(Math.random() * 6)) + basicAttack;
    playBiteSound();
    setAttack(biteDamage);
    setEnemyLife(enemyLife - biteDamage);
    if (fiftyChance()){
      if(userLife < maxUserLife){
        setUserLife(userLife +1);
      }
    }
  };

  const handleMagic = () => {

    if (fiftyChance()){
      const magicDamage = (Math.floor(Math.random() * 3) + 6);
      playMagicSound();
      setAttack(magicDamage);
      setEnemyLife(enemyLife - magicDamage);
    } else {
      const magicDamage = (Math.floor(Math.random() * 3) + 6);
      playMagicSound();
      setAttack(magicDamage);
      setEnemyLife(enemyLife - magicDamage);
    }
  }

  function fiftyChance() {
    const randomNumber = Math.random();
    return randomNumber < 0.5;
  }

  const handleEnemiesSounds = (enemy) =>{
    switch(enemy){
      case "🧟 ZOMBIE":
        if(zombieRef.current){
          zombieRef.current.play();
        }
        break;
      case "🐺 EVIL WEREWOLF":
        if(wolfRef.current){
          wolfRef.current.play();
        }
        break;
      case "🧌 CORRUPTED WITCH":
        if(witchRef.current){
          witchRef.current.play();
        }
      default:
        break;
    }
  }

  const handleAnimalSound = (animal) => {
   
    switch(animal){
      case "🦉 Owl":
        if(owlRef.current){
          owlRef.current.play();
        }
        break;
      case "🐁 Mouse":
        if(mouseRef.current){
          mouseRef.current.play();
        }
        break;
      case "🐍 Snake":
        if(snakeRef.current){
          snakeRef.current.play();
        }
        break;
    }
  }

  const handleNextQuestion = () => {
    const currentQuestion = getQuestionText(currentQuestionIndex);
    setUserLevel(1);
    setGoal(randomGoal);
  
    switch (currentQuestionIndex) {
      case 0:
        if (username) {
          setChatHistory([
            ...chatHistory,
            { question: currentQuestion, answer: username },
          ]);
          setCurrentQuestionIndex(1);
        }
        break;
      case 1:
        setChatHistory([...chatHistory, { question: currentQuestion }]);
        setCurrentQuestionIndex(2);
        break;
      case 2:
        setChatHistory([...chatHistory, { question: currentQuestion }]);
        setCurrentQuestionIndex(3);
        setChoices(["🤵 Human", "🧙‍♀️ Witch", "🧛 Vampire", "👻 Ghost"]);
        break;
      case 3:
        if (characterClass) {
          setChatHistory([
            ...chatHistory,
            { question: currentQuestion, answer: characterClass },
          ]);
          setCurrentQuestionIndex(4);
          setChoices([]);
        }
        break;
      case 4:
        setChatHistory([...chatHistory, { question: currentQuestion }]);
        setCurrentQuestionIndex(5);
        break;
      case 5:
        setChatHistory([...chatHistory, { question: currentQuestion }]);
        setCurrentQuestionIndex(6);
        setChoices(["keep exploring", "follow the light and exit the room"]);
        break;
      case 6:
        setChoices([]);
        setChatHistory([...chatHistory, { question: currentQuestion }]);
        switch (userChoice) {
          case "keep exploring":
            setChatHistory([
              ...chatHistory,
              { question: currentQuestion, answer: userChoice },
            ]);
            setCurrentQuestionIndex(7);
            setChoices(["🧪 Potion", "🔫 Gun", "🗡️ Sword", "💎 Rock"]);
            break;
          case "follow the light and exit the room":
            gainXP(5);
            playDoorSound();
            setChatHistory([
              ...chatHistory,
              { question: currentQuestion, answer: userChoice },
            ]);
            setCurrentQuestionIndex(9);
            break;
          default:
            break;
        }
        break;
      case 7:
        if (weapon) {
          setChatHistory([
            ...chatHistory,
            { question: currentQuestion, answer: weapon },
          ]);
          gainXP(10);
          setCurrentQuestionIndex(8);
          setChoices([]);
          switch (weapon) {
            case "🧪 Potion":
              setUserLife(userLife + 2);
              setBasicAttack(basicAttack + 1);
              setWeaponDesc(armorSpecials[0]);
              break;
            case "🗡️ Sword":
              setWeaponDesc(armorSpecials[1]);
              break;
            case "🔫 Gun":
              setWeaponDesc(armorSpecials[2]);
              break;
            case "💎 Rock":
              setWeaponDesc(armorSpecials[3]);
              let newMaxLife = maxUserLife + 1;
              setMaxUserLife(newMaxLife);
              setUserLife(newMaxLife);
              setXpModifier(2);
              break;
            default:
              break;
          }
        }
        break;
      case 8:
        setChatHistory([...chatHistory, { question: currentQuestion }]);
        setCurrentQuestionIndex(9);
        playDoorSound();
        break;
      case 9:
        setChatHistory([...chatHistory, { question: currentQuestion }]);
        setCurrentQuestionIndex(10);
        break;
      case 10:
        setChatHistory([...chatHistory, { question: currentQuestion }]);
        setCurrentQuestionIndex(11);
        playEnemySound();
        break;
      case 11:
        setChatHistory([
          ...chatHistory,
          { question: currentQuestion, answer: userChoice },
        ]);
        // First enemy encounter
        const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
        const randomEnemyLife = Math.floor(Math.random() * 10 + 5);
        handleEnemiesSounds(randomEnemy);
        setEnemyLife(randomEnemyLife);
        setEnemy(randomEnemy);
        setChoices(["🏃 Escape", "🤺 Fight"]);
        setCurrentQuestionIndex(12);
        break;
      case 12:
        setChatHistory([
          ...chatHistory,
          {question: currentQuestion, answer: userChoice}
        ]);
        switch (userChoice) {
          case "🏃 Escape":
            setCurrentQuestionIndex(24);
            setChoices([]); // Clear choices when the user escapes
            break;
          case "🤺 Fight":
            gainXP(10);
            setCurrentQuestionIndex(13);
            setChoices([ `${classPower}`, `${weapon}`, `Escape`]);
            break;
          default:
            break;
        }
          break;
      case 13:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          switch (userChoice) {
            case "Kick":
                setChatHistory([...chatHistory, { question: currentQuestion }]);
                setCurrentQuestionIndex(13);
                break;
            case `${classPower}`:
                setChatHistory([...chatHistory, { question: currentQuestion }]);
                setCurrentQuestionIndex(13);
                break;
            case `${weapon}`:
                setChatHistory([...chatHistory, { question: currentQuestion }]);
                setCurrentQuestionIndex(13);
                break;
            case "Escape":
                setCurrentQuestionIndex(22);
                setChoices([]); // Clear choices when the user escapes
                break;
            default:
                break;
            }
          if (enemyLife <= 0) {
              setCurrentQuestionIndex(23);
          } 
          handleCombatChoice();
          setCurrentQuestionIndex(14);
          setChoices([]);
          break;
      case 14:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion, answer: userChoice },
          ]);
          // Enemy Attack
          const randomAttack = Math.floor(Math.random() * 2) +1;
          console.log("Enemy attack:"+enemyAttack+"Random Attack:"+randomAttack);
          setEnemyAttack(randomAttack);
          console.log("Enemy attack after set:"+enemyAttack+"Random Attack:"+randomAttack);
          decreaseLife(randomAttack);
          console.log("Enemy attack:"+randomAttack+"Random Attack:"+randomAttack+" -Loss Life:"+randomAttack);
          setCurrentQuestionIndex(15);
          break;
      case 15:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          if (userLife <= 0) {
            setCurrentQuestionIndex(22);
          } else {
            if (enemyLife <= 0) {
              setCurrentQuestionIndex(23);
            }
          }
          setCurrentQuestionIndex(16);  
          break;
      case 16:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          setChoices([`${classPower}`, `${weapon}`, `Escape`]);
          setCurrentQuestionIndex(17);
          break;
      case 17:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion, answer: userChoice},
          ]);
         

          if (userLife <= 0) {
              setCurrentQuestionIndex(22);
          } else {
            if (enemyLife <= 0) {
                setCurrentQuestionIndex(23);
            } else {
                // Enemy 2nd Attack if alive
                const randomAttack = Math.floor(0, 1);
                setEnemyAttack(randomAttack);
                decreaseLife(enemyAttack);
                setCurrentQuestionIndex(18);
            }
            setChoices([]);
          }
          break;
      case 18:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          setCurrentQuestionIndex(19);
          break;
      case 19:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion},
          ]);
          setChoices([`${classPower}`, `${weapon}`, `Escape`]);
          setCurrentQuestionIndex(20);
          break;
      case 20:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion, userChoice },
          ]);
          if (enemyLife <= 0) {
            setCurrentQuestionIndex(23);
          } else {
              // Enemy Third Attack
              const randomAttack = Math.floor(Math.random() * 2 + 1);
              setEnemyAttack(randomAttack);
              decreaseLife(enemyAttack);
              if (userLife <= 0) {
                  setCurrentQuestionIndex(22);
              } else {
                  setCurrentQuestionIndex(21);
              }
          }
          break;
      case 21:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          if (userLife <= 0) {
              setCurrentQuestionIndex(22);
          } else {
              setCurrentQuestionIndex(23);
          }
          break;
      case 22:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]); // User is defeated case
          setCurrentQuestionIndex(22);
          break;
      case 23:
          // Enemy is defeated
          setEnemyLife();
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          gainXP(50);
          setCurrentQuestionIndex(25);
          break;
      case 24:
          setChoices([]);
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          setCurrentQuestionIndex(25);
          break;
      case 25:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          setCurrentQuestionIndex(26);
          break;
      case 26:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          setRandomAnimal(animal[Math.floor(Math.random() * animal.length)]);
          setCurrentQuestionIndex(27);
          break;
      case 27:
          // Wild animal appears
          handleAnimalSound(randomAnimal);
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          setCurrentQuestionIndex(28);
          setChoices(["try to cure", "leave it there and ignore"]);
          break;
      case 28:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion, answer: userChoice },
          ]);
          if (userChoice === "try to cure") {
              gainXP(10);
              setCurrentQuestionIndex(29);
          } else if (userChoice === "leave it there and ignore") {
              setCurrentQuestionIndex(32);
          }
          setChoices([]);
          break;
      case 29:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion },
          ]);
          setChoices(["Blessing of Amar", "Blessing of Inoin"]);
          setCurrentQuestionIndex(30);
          break;
      case 30:
          setChatHistory([
              ...chatHistory,
              { question: currentQuestion, answer: userChoice },
          ]);
          if (userChoice === "Blessing of Inoin") {
              setBlessing("Your gesture was blessed by the great god Inoin. You gain 1 heart and a +1 basic attack");
              let newUserLife = userLife + 1;
              let newMaxLife = maxUserLife + 1;
              setMaxUserLife(newMaxLife);
              setUserLife(newUserLife);
              setBasicAttack(basicAttack + 1);
          } else {
              setBlessing("Your gesture was blessed by the great god Amar. You gain +3 basic attack");
              setBasicAttack(basicAttack + 3);
          }
          setChoices([]);
          setCurrentQuestionIndex(31);
          break;

      default:
        break;
    }
  };
  

  return (
    <div className="game">
      <div className="game-box">
        <div className={`game-head`}>
          {characterClass && (userLife >= 0) ? (<div className="user-info">
            <div className="user-basic"><b>{username}</b> — {characterClass} (Lvl {userLevel})
            <div className="xp-bar">
              <div className="xp-progress" style={{ width: `${(userXP / maxXPForNextLevel) * 100}%` }}>
                {userXP} XP
              </div>
            </div>
            <div className="user-stats">
              <div><span className="stats-label">Basic Attack:</span> {basicAttack}</div>
              <div>{weapon}</div>
            </div>
            {hasLeveled ? (<span className="level-up">You just levelled up!</span>) : ("")}
            </div>
            <p className="user-life">
              {hearts.map((heart, index) => (
                <span key={index} className="heart-emoji">
                  {heart}
                </span>
              ))} 
              {<span>{userLife} / {maxUserLife}</span>}
            </p>
          </div>) : ("")}
          <div className="question">
            <span className="typing-effect">{displayText}</span>
          </div>
          <div className="user-response">
            {currentQuestionIndex === 0 ? (
                <input
                type="text"
                placeholder="Your response"
                value={inputText}
                onChange={handleInputChange}
                disabled={isTyping}
                className="user-input"
              />
            ) : (
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
            )}
            <div className="submit-button">
              { (userLife > 0)?(<button 
                onClick={handleNextQuestion} 
                disabled={isTyping || !inputText || currentQuestionIndex === 22}>
                  {isTyping ? "Writing... " : "Next"}
              </button>) : (
                <button
                  onClick={() => {}}>
                    Restart Game
                  </button>
              )}
            </div>

            {(userLife <= 0) ? (
              <div className="game-lose">

                <h3>Game Over</h3>
                <h4>You lost this session</h4>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>


        {/**Sound effects for the game dynamics */}
        <audio ref={doorRef}>
          <source src="https://tarallotest.it/halloween/door-43633.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={enemyRef}>
          <source src="https://tarallotest.it/halloween/breeze-of-blood-122253.mp3" type="audio/mpeg" />
        </audio>

        {/** User class special attacks */}
        <audio ref={biteRef}>
          <source src="https://tarallotest.it/halloween/monster-bite-44538.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={magicRef}>
          <source src="https://tarallotest.it/halloween/magic-spell-6005.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={ghostatkRef}>
          <source src="https://tarallotest.it/halloween/the-appearance-of-a-mysterious-creature-143028.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={punchRef}>
          <source src="https://tarallotest.it/halloween/punch-140236.mp3" type="audio/mpeg" />
        </audio>

        {/** Enemies sounds */}
        <audio ref={zombieRef}>
          <source src="https://tarallotest.it/halloween/zombie-6851.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={wolfRef}>
          <source src="https://tarallotest.it/halloween/wolf-howling-140235.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={witchRef}>
          <source src="https://tarallotest.it/halloween/witch-laughing-104760.mp3" type="audio/mpeg" />
        </audio>

        {/** Friendly animal sounds */}
        <audio ref={owlRef}>
          <source src="https://tarallotest.it/halloween/owl-humanatone-102805.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={snakeRef}>
          <source src="https://tarallotest.it/halloween/snake-hissing-6092.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={mouseRef}>
          <source src="https://tarallotest.it/halloween/mouse-6821.mp3" type="audio/mpeg" />
        </audio>
        

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
