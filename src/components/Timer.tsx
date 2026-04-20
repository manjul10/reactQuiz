import { useEffect, useState } from "react";

const Timer = ({ length, setGameOver }) => {
  const secPerQuestion = 30;

  const [secondsLefts, setSecondsLeft] = useState(secPerQuestion * length);
  // const time = secondRemaining / 60;

  useEffect(() => {
    if (secondsLefts <= 0) {
      setGameOver(true);
      return;
    }
    const id = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [secondsLefts]);

  const min = Math.floor(secondsLefts / 60);
  const secs = secondsLefts % 60;
  return (
    <div className="p-4 px-5 bg-gray-500 text-white font-medium rounded-full text-xl hover:bg-gray-800 outline-white ">
      {min}:{secs < 10 ? `0${secs}` : secs}
    </div>
  );
};

export default Timer;
