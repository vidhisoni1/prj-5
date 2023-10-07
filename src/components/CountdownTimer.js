import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ initialTime }) {
  const [initialTimeValue, setInitialTimeValue] = useState(initialTime);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isRunning && time > 0) {
      // Create an interval to update the timer every second
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Clear the interval when the component unmounts, when the timer reaches zero, or when stopped
    return () => clearInterval(timerInterval);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTimeValue);
  };
  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>Time remaining: {formatTime(time)}</p>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning || time <= 0}>
        Stop
      </button>
      <button onClick={resetTimer} disabled={isRunning}>
        Reset
      </button>
    </div>
  )};