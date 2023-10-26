import  { useState, useEffect } from "react";

export default function Game() {
  const [maxUserLife, setMaxUserLife] = useState(4);
  const [userLife, setUserLife] = useState(3);
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
  const [blackHeartsCount, setBlackHeartsCount] = useState();
  const blackHearts = Array(blackHeartsCount).fill('🖤');
  const [enemy, setEnemy] = useState("");
  const [enemyLife, setEnemyLife] = useState(10);
  const [basicAttack, setBasicAttack] = useState(1);
  const [attack, setAttack] = useState(); 
  const [enemyAttack, setEnemyAttack] = useState("");
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [maxXPForNextLevel, setMaxXPForNextLevel] = useState(100);
  const [randomAnimal, setRandomAnimal] = useState("");
  const [blessing, setBlessing] = useState();
  const [xpModifier, setXpModifier] = useState(1);
  const [hasLeveled, setHasLeveled] = useState(false);
  const [classPower, setClassPower] = useState("");

  const decreaseLife = (amount) => {
    if (userLife > 0) {
      let newLife = userLife - amount;
      setUserLife(newLife);
    }
  };

  const gainLife = (amount) => {
    if(userLife < maxUserLife){
      let newLife = userLife + amount;
      setUserLife(newLife);
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
    "👹 WANDERING SPIRIT",
    "🐺 EVIL WEREWOLF",
  ]

  const animal = [
    "🦉 Owl",
    "🐁 Mouse",
    "🐍 Snake",
    "🐿️ Chipmunk"
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
      return `Well done ${username}! ${enemy} has been defeated. (${attack} damages from by last hit)`;
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

    if (currentQuestionIndex === 6 || currentQuestionIndex === 12 || currentQuestionIndex === 28 || currentQuestionIndex === 29 || currentQuestionIndex === 30 || currentQuestionIndex === 34 || currentQuestionIndex === 35 || currentQuestionIndex === 39 || currentQuestionIndex === 42 || currentQuestionIndex === 44) {
      //
      setUserChoice(choice);
      
    } else if (currentQuestionIndex === 13 || currentQuestionIndex === 17 || currentQuestionIndex === 20) {
      setUserChoice(choice);
      if (choice === "Kick") {
        // Define damage for the Kick action
        const kickDamage = 3 + basicAttack;
        setEnemyLife(enemyLife - kickDamage);
        setAttack(kickDamage);
        
      } else if (choice === "Punch") {
        // Define damage for the Punch action
        const punchDamage = 2 + basicAttack;
        setEnemyLife(enemyLife - punchDamage);
        setAttack(punchDamage);
      } else if (choice === weapon) {
        // Logic for weapon option choice 
        // const weaponDamage = 5; 
        // setAttack(weaponDamage);
        
        // setEnemyLife(enemyLife - weaponDamage);
        switch(choice){
          case "🗡️ Sword":
            const randSwordDamage = (Math.floor(Math.random() * 10 + 2)) + basicAttack;
            setAttack(randSwordDamage);
            setEnemyLife(enemyLife - randSwordDamage);
            break;
          case "🔫 Gun":
            const gunDamage = 7 + basicAttack;
            setAttack(gunDamage);
            setEnemyLife(enemyLife - gunDamage);
            break;
          case "💎 Rock":
            const rockDamage = 2 + basicAttack;
            setAttack(rockDamage);
            setEnemyLife(enemyLife - gunDamage);
            break;
          case "📿 Evelin's Necklace":
            const magicalDamage = (Math.floor(Math.random() * 30 + 2)) + basicAttack;
            setAttack(magicalDamage);
            setEnemyLife(enemyLife - magicalDamage);
            break;
          default: 
            const weaponDamage = basicAttack;
            setAttack(weaponDamage);
            setEnemyLife(enemyLife - weaponDamage);
            break;
        }
      } else if (choice === "🩸 Bite") {
        const biteDamage = (Math.floor(Math.random() * 6)) + basicAttack;
        const lifeGained = biteDamage/2;
        console.log("Life Gained"+lifeGained+ " - Bite Damage" +biteDamage);
        setAttack(biteDamage);
        setEnemyLife(enemyLife - biteDamage);
        gainLife(lifeGained);
            
      }
      else if (choice === "Escape") {
        setChoices([]);
        setCurrentQuestionIndex(24);
        
      }
    }
    else if (currentQuestionIndex === 7) {
      // If this is the weapon selection
      setWeapon(choice);
    } else if (currentQuestionIndex === 3) { 
      // Else for now it will be the character class selection
      setCharacterClass(choice);
      switch(choice) {
        case "🤵 Human":
          setBasicAttack(1);
          setMaxUserLife(3);
          setUserLife(3);
          setClassPower("👊 Power Fist");
          break;
        case "🧙‍♀️ Witch":
          setBasicAttack(3);
          setMaxUserLife(2);
          setUserLife(2);
          setClassPower("✨ Magical Hit");
          break;
        case "🧛 Vampire":
          setBasicAttack(2);
          setMaxUserLife(3);
          setUserLife(3);
          setClassPower("🩸 Bite");
          break;
        case "👻 Ghost":
          setBasicAttack(1);
          setMaxUserLife(5);
          setUserLife(5);
          setClassPower("😱 Scare");
          break;
      }
    }
};

  
  const handleNextQuestion = () => {

    setGoal(randomGoal);
    const currentQuestion = getQuestionText(currentQuestionIndex);
    const blackHeartsnr = maxUserLife - userLife;
    setBlackHeartsCount(blackHeartsnr);
    console.log("Current Question Index: ", currentQuestionIndex);

  
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
        gainXP(5);
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
      gainXP(10);
      setCurrentQuestionIndex(8);
      setChoices([]);
      switch(weapon){
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
        if (userChoice === "🏃 Escape") {
          setCurrentQuestionIndex(24);
          setChoices([]); // Clear choices when the user escapes
        } else if (userChoice === "🤺 Fight") {
          gainXP(10);
          setCurrentQuestionIndex(13);
          setChoices([`Kick`, `${classPower}`, `${weapon}`, `Escape`]);
        }
      } else if (currentQuestionIndex === 13) {
        setChatHistory([
          ...chatHistory,
          { question: currentQuestion, answer: userChoice },
        ]);
        if(enemyLife <= 0){
          setCurrentQuestionIndex(23);
        } else {
          // Enemy Attack
          const randomAttack = Math.floor(Math.random() * 2);
          setEnemyAttack(randomAttack);
          decreaseLife(randomAttack);
          setCurrentQuestionIndex(14);
        }
        setChoices([]);
    } else if (currentQuestionIndex === 14) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
    setCurrentQuestionIndex(15); 
    } else if (currentQuestionIndex === 15) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      // Enemy Attack
      const randomAttack = Math.floor(Math.random() * 2 + 1);
      setEnemyAttack(randomAttack);
      decreaseLife(enemyAttack);
      setCurrentQuestionIndex(16); 
    } else if (currentQuestionIndex === 16) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setCurrentQuestionIndex(17);
      setChoices([`Kick`, `${classPower}`, `${weapon}`, `Escape`]);
    } else if (currentQuestionIndex === 17) {
      gainXP(5);
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
        decreaseLife(enemyAttack);
        setCurrentQuestionIndex(18);
      }
      setChoices([]);
    } else if (currentQuestionIndex === 18){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
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
      setChoices([`Kick`, `${classPower}`, `${weapon}`, `Escape`]);
      setCurrentQuestionIndex(20); 
    } else if (currentQuestionIndex === 20) {
      gainXP(5);
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,  answer: userChoice},
      ]);
      if(enemyLife <= 0){
        setCurrentQuestionIndex(23);
      } else {
        // Enemy Third Attack
        const randomAttack = Math.floor(Math.random() * 2 + 1);
        setEnemyAttack(randomAttack);
        decreaseLife(enemyAttack);
        if(userLife <= 0) {
          setCurrentQuestionIndex(22);
        } else {
          setCurrentQuestionIndex(21);
        }
      }
      setChoices([]);
    } else if (currentQuestionIndex === 21){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
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
      setEnemyLife();
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]);
      gainXP(50);
      setCurrentQuestionIndex(25);
    } else if (currentQuestionIndex === 24){
      setChoices([]);
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]);
      setCurrentQuestionIndex(25);
    } else if (currentQuestionIndex === 25){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]);
      setCurrentQuestionIndex(26);
    } else if (currentQuestionIndex === 26){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]);
      setRandomAnimal(animal[Math.floor(Math.random() * animal.length)]);
      setCurrentQuestionIndex(27);
    } else if (currentQuestionIndex === 27){
      // Wild animal appear 
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]);
      setCurrentQuestionIndex(28);
      setChoices(["try to cure", "leave it there and ignore"]);
    } else if (currentQuestionIndex === 28){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: userChoice},
      ]);
      if(userChoice === "try to cure") {
        gainXP(10);
        setCurrentQuestionIndex(29);
      } else if (userChoice === "leave it there and ignore"){
        setCurrentQuestionIndex(32);
      }
      setChoices([]);
    } else if (currentQuestionIndex === 29){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion,},
      ]);
      setChoices(["Blessing of Amar", "Blessing of Inoin"])
      setCurrentQuestionIndex(30);
    } else if (currentQuestionIndex === 30){
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: userChoice},
      ]);

      if(userChoice === "Blessing of Inoin"){
      setBlessing("Your gesture was blessed by the great god Inoin. You gain 1 heart and a +1 basic attack");
      let newUserLife = userLife + 1;
      setMaxUserLife(newUserLife);
      setBasicAttack(basicAttack + 1);
    } else{
      setBlessing("Your gesture was blessed by the great god Amar. You gain +3 basic attack");
      setBasicAttack(basicAttack + 3);
    }
      setChoices([]);
      setCurrentQuestionIndex(31);
    } else if (currentQuestionIndex === 31) {
      gainXP(5);
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: userChoice},
      ]);
      setCurrentQuestionIndex(33);
    } else if (currentQuestionIndex === 32) {
      gainXP(5);
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setCurrentQuestionIndex(33);
    } else if (currentQuestionIndex === 33) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setChoices(["Yes", "No"]);
      setCurrentQuestionIndex(34);
    } if (currentQuestionIndex === 34) {
      if (userChoice === "Yes") {
        // Update chatHistory for the user's choice
        setChatHistory([
          ...chatHistory,
          { question: currentQuestion, answer: userChoice },
        ]);
        setChoices(["Go and see", "It could be dangerous"]);
        setCurrentQuestionIndex(35);
      } else if (userChoice === "No") {
        // Update chatHistory for the user's choice
        setChatHistory([
          ...chatHistory,
          { question: currentQuestion, answer: userChoice },
        ]);
        
        setChoices([]);
        // Handle the "No"
        setCurrentQuestionIndex(48);
      }
      } else if (currentQuestionIndex === 35) {
        if (userChoice === "Go and see") {
          gainXP(10);
          setChatHistory([
            ...chatHistory,
            { question: currentQuestion, answer: userChoice },
          ]);
      
          // Clear choices
          setChoices([]);
          setCurrentQuestionIndex(36);
        } else if (userChoice === "It could be dangerous") {
          setChatHistory([
            ...chatHistory,
            { question: currentQuestion, answer: userChoice },
          ]);
          setCurrentQuestionIndex(48);
        }
      }
    else if (currentQuestionIndex === 36) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setCurrentQuestionIndex(37);
    } else if (currentQuestionIndex === 37) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setCurrentQuestionIndex(38);
    }else if (currentQuestionIndex === 38) {
    setChatHistory([
      ...chatHistory,
      { question: currentQuestion},
    ]);
    setChoices(["What happened to you?", "Who cares..."])
    setCurrentQuestionIndex(39);
    }else if (currentQuestionIndex === 39) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: userChoice},
      ]);
      if (userChoice === "What happened to you?") {
        setCurrentQuestionIndex(40);
      } else if (userChoice === "Who cares...") {
        setCurrentQuestionIndex(43);
      }
      setChoices([]);
    } else if (currentQuestionIndex === 40) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setCurrentQuestionIndex(41);
    } else if (currentQuestionIndex === 41) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setCurrentQuestionIndex(42);
    }else if (currentQuestionIndex === 42) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setChoices([`No thanks`, `Swap with ${weapon}`])
      setCurrentQuestionIndex(44);
    } else if (currentQuestionIndex === 43) {
    setChatHistory([
      ...chatHistory,
      { question: currentQuestion},
    ]);
    setCurrentQuestionIndex(46); //check
  } else if (currentQuestionIndex === 44) {
    setChatHistory([
      ...chatHistory,
      { question: currentQuestion, answer: userChoice},
    ]);
    setChoices([]);
    if(userChoice === `No thanks`){
      setCurrentQuestionIndex(46);
    } else {
      gainXP(10);
      setWeapon("📿 Evelin's Necklace")
      setCurrentQuestionIndex(45)
    }
  } else if (currentQuestionIndex === 45) {
    setChatHistory([
      ...chatHistory,
      { question: currentQuestion},
    ]);
    setCurrentQuestionIndex(46);
  }else if (currentQuestionIndex === 46) {
    setChatHistory([
      ...chatHistory,
      { question: currentQuestion},
    ]);
    setCurrentQuestionIndex(47);
  }else if (currentQuestionIndex === 47) {
    setChatHistory([
      ...chatHistory,
      { question: currentQuestion},
    ]);
    setCurrentQuestionIndex(48);
  }else if (currentQuestionIndex === 48) {
    setChatHistory([
      ...chatHistory,
      { question: currentQuestion},
    ]);
    setCurrentQuestionIndex(49);
  } else if (currentQuestionIndex === 49) {
    setChatHistory([
      ...chatHistory,
      { question: currentQuestion},
    ]);
    setCurrentQuestionIndex(50);
    } else if (currentQuestionIndex === 50) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion},
      ]);
      setCurrentQuestionIndex(51);
      // 2nd enemy encounter
      const secondEnemy = enemies[Math.floor(Math.random() * enemies.length)];
      const secondEnemyLife = Math.floor(Math.random() * 15 + 8);
      setEnemyLife(secondEnemyLife);
      setEnemy(secondEnemy);
      setChoices(["🏃 Escape", "🤺 Fight"]);
    }  else if (currentQuestionIndex === 51) {
      setChatHistory([
        ...chatHistory,
        { question: currentQuestion, answer: userChoice },
      ]);
        if (userChoice === "🏃 Escape") {
          setCurrentQuestionIndex(60);
          setChoices([]); // Clear choices when the user escapes
        } else if (userChoice === "🤺 Fight") {
          gainXP(10);
          setCurrentQuestionIndex(52);
          setChoices([`Kick`, `${classPower}`, `${weapon}`, `Escape`]);
        }
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
               {blackHearts.map((heart, index) => (
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
