import React, { useState, useEffect } from "react";

function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`12/01/${year}`) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        day: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hour: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minute: Math.floor((difference / 1000 / 60) % 60),
        second: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval] !== 1) {
      timerComponents.push(
        <div className="d-flex mx-4">
          <h3 className="mx-1">{timeLeft[interval]}</h3> <h4>{interval}s </h4>
        </div>
      );
      return;
    }
    timerComponents.push(
      <div className="d-flex mx-4">
        <h3 className="mx-1">{timeLeft[interval]}</h3> <h4>{interval} </h4>
      </div>
    );
  });
  return (
    <>
      <div className="fondo-blanco w-100 mb-3 caja-blanca-2 landing-countdown">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <h1 className="font-title">Now!!</h1>
        )}
      </div>
    </>
  );
}

export default Index;
