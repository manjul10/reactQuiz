import { useReducer } from "react";
import questionsData from "../assets/questions.json";

import Questions from "./Questions";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
const initialState = {
  questions: questionsData.questions,
  score: 0,
  questionIndex: 0,
  isStarted: false,
  selectedAnswer: null,
  gameOver: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        isStarted: true,
      };
    // case "ready":
    //   return {
    //     ...state,
    //     selectedAnswer: action.payload,
    //     score: state.score + action.payload,
    //   };
    case "newAnswer":
      //Tracking the index of the current question
      const currentQuestion = state.questions[state.questionIndex];
      //check if the payload data matches the current question option
      const isCorrect = action.payload === currentQuestion.correctOption;
      return {
        ...state,
        selectedAnswer: action.payload,
        score: isCorrect ? state.score + currentQuestion.points : state.score,
      };
    case "newQuestion":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        selectedAnswer: null,
      };

    case "finish":
      return {
        ...state,
        selectedAnswer: null,
        questionIndex: 0,
        isStarted: false,
        gameOver: true,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const LandingPage = () => {
  // const [score, setScore] = useState(0);
  // const { questions } = questionsData;
  // const [questionIndex, setQuestionIndex] = useState(0);
  // const [isStarted, setIsStarted] = useState(false);
  // const [selectedAnswer, setSelectedAnswer] = useState(null);
  // const [gameOver, setGameOver] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    score,
    questions,
    questionIndex,
    isStarted,
    selectedAnswer,
    gameOver,
  } = state;

  // Calculate total possible score
  const totalPossibleScore = questions.reduce(
    (acc: any, q: any) => acc + q.points,
    0,
  );
  const scorePercentage = Math.round((score / totalPossibleScore) * 100);

  // SVG circle math for score ring
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scorePercentage / 100) * circumference;

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
      {!gameOver ? (
        <>
          {!isStarted ? (
            /* ===== WELCOME SCREEN ===== */
            <div className="glass-card w-full max-w-xl p-10 md:p-14 flex flex-col items-center text-center animate-scale-in">
              {/* React Logo */}
              <div className="react-logo-container animate-float mb-6">
                <div className="react-logo-glow"></div>
                <img
                  src="/react.svg"
                  alt="React Logo"
                  className="w-24 h-24 animate-glow animate-spin-slow"
                />
              </div>

              {/* Title */}
              <h1 className="font-codystar text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-indigo-300 via-purple-300 to-violet-400 bg-clip-text text-transparent animate-fade-in-up">
                The React Quiz
              </h1>

              {/* Subtitle */}
              <p
                className="text-white/50 text-lg font-inter font-light mb-2 animate-fade-in-up delay-100"
                style={{ animationFillMode: "backwards" }}
              >
                Welcome to The React Quiz!
              </p>

              {/* Badge */}
              <div
                className="score-badge mb-10 animate-fade-in-up delay-200"
                style={{ animationFillMode: "backwards" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                {questions.length} questions to test your React mastery
              </div>

              {/* Start Button */}
              <button
                className="btn-premium animate-fade-in-up delay-300"
                style={{ animationFillMode: "backwards" }}
                onClick={() => dispatch({ type: "start" })}
              >
                Let's Start
                <svg
                  className="inline-block ml-2 w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            /* ===== QUIZ SCREEN ===== */
            <div className="glass-card w-full max-w-2xl p-8 md:p-10 animate-scale-in">
              {/* Top bar: Counter + Progress + Score */}
              <div className="flex items-center justify-between mb-8 animate-fade-in">
                <div className="question-counter animate-slide-in-left">
                  Question {questionIndex + 1}
                  <span className="text-white/30"> / {questions.length}</span>
                </div>

                <ProgressBar
                  length={questions.length}
                  questionIndex={questionIndex + 1}
                />

                <div className="score-badge animate-slide-in-right">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {score}
                </div>
              </div>

              {/* Question Area */}
              <div className="animate-fade-in-up">
                <Questions
                  question={questions[questionIndex]}
                  // setScore={setScore}
                  selectedAnswer={selectedAnswer}
                  // setSelectedAnswer={setSelectedAnswer}
                  dispatch={dispatch}
                />
              </div>

              {/* Bottom bar: Timer + Next */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <Timer
                  length={questions.length}
                  setGameOver={() => dispatch({ type: "reset" })}
                />

                <button
                  className={`btn-premium transition-all duration-300 ${
                    selectedAnswer !== null
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                  onClick={() =>
                    dispatch({
                      type:
                        questionIndex < questions.length - 1
                          ? "newQuestion"
                          : "finish",
                    })
                  }
                >
                  {questionIndex < questions.length - 1 ? "Next" : "Finish"}
                  <svg
                    className="inline-block ml-2 w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* ===== FINISH SCREEN ===== */
        <div className="glass-card w-full max-w-lg p-10 md:p-14 flex flex-col items-center text-center animate-scale-in">
          {/* Score Ring */}
          <div className="score-ring mb-8 animate-fade-in-up">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <circle className="score-ring-bg" cx="100" cy="100" r={radius} />
              <circle
                className="score-ring-fill"
                cx="100"
                cy="100"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="score-value">
              <span className="text-4xl font-bold bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
                {scorePercentage}%
              </span>
              <span className="text-white/40 text-sm font-medium mt-1">
                Score
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-2xl md:text-3xl font-bold text-white/90 mb-2 animate-fade-in-up delay-100"
            style={{ animationFillMode: "backwards" }}
          >
            {scorePercentage >= 80
              ? "🎉 Outstanding!"
              : scorePercentage >= 50
                ? "👏 Well Done!"
                : "💪 Keep Practicing!"}
          </h1>

          {/* Score detail */}
          <p
            className="text-white/40 text-base mb-3 animate-fade-in-up delay-200"
            style={{ animationFillMode: "backwards" }}
          >
            You scored{" "}
            <span className="text-indigo-400 font-semibold">{score}</span> out
            of{" "}
            <span className="text-white/60 font-semibold">
              {totalPossibleScore}
            </span>{" "}
            points
          </p>

          {/* Stats row */}
          <div
            className="flex gap-4 mb-8 animate-fade-in-up delay-300"
            style={{ animationFillMode: "backwards" }}
          >
            <div className="glass-card-sm px-5 py-3 text-center">
              <div className="text-lg font-bold text-indigo-300">
                {questions.length}
              </div>
              <div className="text-xs text-white/40 font-medium">Questions</div>
            </div>
            <div className="glass-card-sm px-5 py-3 text-center">
              <div className="text-lg font-bold text-emerald-400">{score}</div>
              <div className="text-xs text-white/40 font-medium">Points</div>
            </div>
            <div className="glass-card-sm px-5 py-3 text-center">
              <div className="text-lg font-bold text-purple-300">
                {scorePercentage}%
              </div>
              <div className="text-xs text-white/40 font-medium">Accuracy</div>
            </div>
          </div>

          {/* Restart button */}
          <button
            className="btn-premium animate-fade-in-up delay-400"
            style={{ animationFillMode: "backwards" }}
            onClick={() => dispatch({ type: "reset" })}
          >
            <svg
              className="inline-block mr-2 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
