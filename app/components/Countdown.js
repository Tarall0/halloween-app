"use client"
import React, { useState, useEffect } from 'react';
import FullMoon from './FullMoon';
import Ghosts from './Ghosts';
import Pumpkin from './Pumpkin';
import Image from 'next/image';
import Halloween from './Halloween';
import Game from './Game';


const Countdown = () => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    const [isLoading, setIsLoading] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showMessage, setShowMessage] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showUnnotified, setShowUnnotified] = useState(false);
    const [permission, setPermission] = useState(false);
    const [game, setGame] = useState(false);

    const handleDimiss = () => {
      setShowMessage(false);
    }

    const playGame = () => {
      setGame(true);
      setShowMessage(false);
    }

    // Calculate days hours minutes and seconds until Halloween
    useEffect(() => {
      const interval = setInterval(() => {
        const today = new Date();
        const halloweenDate = new Date(today.getFullYear(), 9, 31); // 9 represents October as 0 based index

        if (today > halloweenDate) {
          halloweenDate.setFullYear(today.getFullYear() + 1);
        }

        const newTimeRemaining = halloweenDate - today;
        setTimeRemaining(newTimeRemaining);

        const days = Math.floor(newTimeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((newTimeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((newTimeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((newTimeRemaining % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
        setIsLoading(false);

        if (newTimeRemaining <= 0) {
          clearInterval(interval);
        }
      }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className='countdown-section'>
      {isLoading ? (
        <div className='loading'>
          I am calculating the time left ... 
        </div>
      ) : timeRemaining <= 0 ? (
        // Elements to add if it is actually Halloween
        <div className='halloween-day'>
          <p>🎃<b> Good news!</b> The time is finally here.</p>
          <div className='halloween-buttons'>
          <button>👻 Trick</button>
          <button>🍬 Treat</button>
          </div>
        </div>
      ) : (
        // Elements to render when the condition is false
          showMessage && (
            <div className='not-halloween'>
              <p>🎃 There is still time for Halloween</p>
              <div className='halloween-buttons'>
                <button onClick={playGame}> Play Game</button>
                <button onClick={handleDimiss}><b>X</b> Dimiss</button>
              </div>
            </div>
            )
        )}

        {game ? (
          <Game/>
        ) : (
          <div className='halloween-box'>
            <h1 className='gradient-text'>Halloween Countdown</h1>
            <div className="countdown">
                <div className="countdown-item">
                  <span className="countdown-number">{countdown.days} days </span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number"> {countdown.hours} hours </span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number"> {countdown.minutes} minutes </span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number"> {countdown.seconds} seconds</span>
                </div>
            </div>
          </div>
        )}

        <FullMoon/>
        <Ghosts/>       
        <Image src="https://tarallotest.it/80350.png" width={500} height={500} loading='lazy' className='spooky-hill' alt='spooky hill image'></Image>
        
        
    </section>
  );
};

export default Countdown;
