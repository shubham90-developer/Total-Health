"use client";

import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    } else {
      timeLeft = { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-1 font-mono text-black">
      {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map(
        (unit, index) => (
          <React.Fragment key={index}>
            {unit.split("").map((digit, idx) => (
              <span
                key={idx}
                className="bg-white text-green-700 px-2 py-0.5 rounded text-sm"
              >
                {digit}
              </span>
            ))}
            {index < 3 && <span className="text-white px-1">:</span>}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default CountdownTimer;
