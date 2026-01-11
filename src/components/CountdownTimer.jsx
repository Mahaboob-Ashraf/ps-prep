import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    // TARGET DATE: January 19, 2026
    const targetDate = new Date("2026-01-19T09:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Helper to make the number cards
  const TimeCard = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
        <span className="text-2xl sm:text-3xl font-bold text-blue-400">
          {value < 10 ? `0${value}` : value}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-gray-400 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center mt-10">
      <TimeCard value={timeLeft.days} label="Days" />
      <TimeCard value={timeLeft.hours} label="Hours" />
      <TimeCard value={timeLeft.minutes} label="Mins" />
      <TimeCard value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default CountdownTimer;
