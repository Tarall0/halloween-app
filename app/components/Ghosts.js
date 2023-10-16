"use client"
import React, { useEffect, useState } from 'react';
import Ghost from './Ghost';

export default function Ghosts() {
  const [ghosts, setGhosts] = useState([]);

  useEffect(() => {
    const generateRandomPosition = () => {
      return {
        transform: `translate(${Math.random() * 100}vw, ${Math.random() * 100}vh)`,
      };
    };

    const ghostComponents = [
      <Ghost key={1} {...generateRandomPosition()} />,
      <Ghost key={2} {...generateRandomPosition()} />,
      <Ghost key={3} {...generateRandomPosition()} />,
    ];

    setGhosts(ghostComponents);

    setTimeout(() => {
      const ghostElements = document.querySelectorAll('.ghost');
      ghostElements.forEach((ghost, index) => {
        setTimeout(() => {
          ghost.style.opacity = '1';
          ghost.style.transform = ghostComponents[index].props.transform;
        }, index * 1000);
      });
    }, 1000);
  }, []);

  return (
    <div className="ghost-container">
      {ghosts}
    </div>
  );
}
