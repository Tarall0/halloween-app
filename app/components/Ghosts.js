import React, { useEffect, useState } from 'react';
import Ghost from './Ghost';
import "../styles/ghosts.css";

export default function Ghosts() {
  const [ghosts, setGhosts] = useState([]);
  let numberGhosts = 5;

  useEffect(() => {
    const generateRandomPosition = () => {

      return {
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        rotate: `-${Math.random() *60}deg`,
        opacity: `${Math.random() * 0.4 }`, 
        animationDuration: `${Math.random() * 5 + 2}s`, 
      };
    };

    const ghostComponents = [];

    for (let i = 0; i < numberGhosts; i++) {
      ghostComponents.push(
        <Ghost key={i} style={generateRandomPosition()} />
      );
    }

    setGhosts(ghostComponents);

  }, []);

  return (
    <div className="ghost-container">
      {ghosts.map((ghost, index) => (
        <div key={index}>
          {ghost}
        </div>
      ))}
    </div>
  );
}
