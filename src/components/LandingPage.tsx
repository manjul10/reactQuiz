import { useState } from "react";
import questionsData from "../assets/questions.json";

import Questions from "./Questions";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";

const LandingPage = () => {
  const [score, setScore] = useState(0);
  const { questions } = questionsData;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  return (
    <>
      {!gameOver ? (
        <>
          <div>
            <div className=" flex items-center justify-center gap-16 text-center my-6">
              <img src="/react.svg" alt="react_logo" className="w-35 h-35 " />
              <h1 className="text-6xl font-codystar font-bold">
                The React Quiz
              </h1>
            </div>
            {!isStarted ? (
              <div className="flex flex-col items-center justify-center text-center font-bold text-4xl gap-10 text-white">
                <h1>
                  Welcome to The React Quiz!<br></br>{" "}
                  <span className="text-2xl">
                    {questions.length} questions to test your React mastery{" "}
                  </span>
                </h1>
                <button
                  className="p-4 px-5 bg-gray-500 text-white font-medium rounded-full text-xl hover:bg-gray-800 outline-white"
                  onClick={() => setIsStarted(true)}
                >
                  {" "}
                  Let's Start
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-around mb-8 text-amber-50 text-2xl px-10">
                  <span className="font-bold">
                    Questions {questionIndex + 1} / {questions.length}
                  </span>
                  <ProgressBar
                    length={questions.length}
                    questionIndex={questionIndex + 1}
                  />
                  Your current score is: {score}
                </div>

                <div className="flex items-center justify-center font-bold text-4xl gap-10">
                  <Questions
                    question={questions[questionIndex]}
                    setScore={setScore}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                  />
                </div>
                <div className="flex items-center justify-around mt-6">
                  <Timer length={questions.length} setGameOver={setGameOver} />
                  <button
                    className={`p-4 px-5 bg-gray-500 text-white font-medium rounded-full text-xl hover:bg-gray-800 outline-white ${selectedAnswer !== null ? "block" : "hidden"}`}
                    onClick={() => {
                      if (questionIndex < questions.length - 1) {
                        setQuestionIndex((prev) => prev + 1);
                        setSelectedAnswer(null);
                      } else {
                        setGameOver(true);
                      }
                    }}
                  >
                    {questionIndex < questions.length - 1 ? "Next" : "Finish"}
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex text-amber-50 flex-col items-center justify-center h-screen gap-5">
            <h1 className="text-3xl font-semibold">
              Quiz Finished! Your Final Score: {score}
            </h1>
            <button
              className="p-4 px-5 bg-gray-500 text-white font-medium rounded-full text-xl hover:bg-gray-800 outline-white"
              onClick={() => {
                setIsStarted(false);
                setScore(0);
                setQuestionIndex(0);
                setSelectedAnswer(null);
                setGameOver(false);
              }}
            >
              Restart
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default LandingPage;
