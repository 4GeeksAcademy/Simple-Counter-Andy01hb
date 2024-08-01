// src/js/component/Home.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import '../../styles/home.css';

function Home() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isCountdown, setIsCountdown] = useState(false);
  const [alertTime, setAlertTime] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const newTime = isCountdown ? prevSeconds - 1 : prevSeconds + 1;
          if (alertTime !== null && newTime === alertTime) {
            alert(`Time reached: ${alertTime} seconds`);
          }
          return newTime;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isCountdown, alertTime]);

  const formatNumber = (number) => {
    return String(number).padStart(6, '0').split('');
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
    setIsCountdown(false);
  };

  const handleCountdown = (countdownTime) => {
    setSeconds(countdownTime);
    setIsCountdown(true);
    setIsActive(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="counter">
          <div className="digit"><FontAwesomeIcon icon={faClock} /></div>
          {formatNumber(seconds).map((digit, index) => (
            <div key={index} className="digit">{digit}</div>
          ))}
        </div>
        <div className="controls">
          <button onClick={() => setIsActive(!isActive)}>
            {isActive ? 'Stop' : 'Resume'}
          </button>
          <button onClick={handleReset}>Reset</button>
          <input 
            type="number" 
            placeholder="Set alert time" 
            onChange={(e) => setAlertTime(Number(e.target.value))} 
          />
          <input 
            type="number" 
            placeholder="Countdown from" 
            onBlur={(e) => handleCountdown(Number(e.target.value))} 
          />
        </div>
      </header>
    </div>
  );
}

export default Home;
