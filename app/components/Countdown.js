"use client"
import React, { useState, useEffect } from 'react';
import FullMoon from './FullMoon';
import Ghosts from './Ghosts';
import Pumpkin from './Pumpkin';
import Image from 'next/image';

const Countdown = () => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

  // Calculate days hours minutes and seconds until Halloween (October 31)
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const halloweenDate = new Date(today.getFullYear(), 9, 31); // 9 represents October (0-based index)

      if (today > halloweenDate) {
        halloweenDate.setFullYear(today.getFullYear() + 1);
      }

      const timeRemaining = halloweenDate - today;

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <FullMoon/>
        <Ghosts/>       
        <Image src="https://tarallotest.it/80350.png" width={500} height={500} loading='lazy' className='spooky-hill'></Image>
        
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
    </>
  );
};

export default Countdown;
