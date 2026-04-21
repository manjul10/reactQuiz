import { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {
  const { length, dispatch } = useQuiz();
  const secPerQuestion = 30;

  const [secondsLefts, setSecondsLeft] = useState(secPerQuestion * length);
  // const time = secondRemaining / 60;

  useEffect(() => {
    if (secondsLefts <= 0) {
      dispatch({ type: "reset" });
      // setGameOver(true);
      return;
    }
    const id = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [secondsLefts]);

  const min = Math.floor(secondsLefts / 60);
  const secs = secondsLefts % 60;

  const totalSeconds = secPerQuestion * length;
  const isWarning =
    secondsLefts <= totalSeconds * 0.3 && secondsLefts > totalSeconds * 0.1;
  const isDanger = secondsLefts <= totalSeconds * 0.1;

  return (
    <div
      className={`timer-pill ${isDanger ? "danger" : isWarning ? "warning" : ""}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {min}:{secs < 10 ? `0${secs}` : secs}
    </div>
  );
};

export default Timer;
