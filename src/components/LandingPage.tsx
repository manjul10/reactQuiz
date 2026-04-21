// import { useReducer } from "react";
// import questionsData from "../assets/questions.json";

import Questions from "./Questions";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import { useQuiz } from "../context/QuizContext";
import QuizScreen from "./QuizScreen";
import FinishScreen from "./FinishScreen";
// const initialState = {
//   questions: questionsData.questions,
//   score: 0,
//   questionIndex: 0,
//   isStarted: false,
//   selectedAnswer: null,
//   gameOver: false,
// };

// const reducer = (state: any, action: any) => {
//   switch (action.type) {
//     case "start":
//       return {
//         ...state,
//         isStarted: true,
//       };
// case "ready":
//   return {
//     ...state,
//     selectedAnswer: action.payload,
//     score: state.score + action.payload,
//   };
//     case "newAnswer":
//       //Tracking the index of the current question
//       const currentQuestion = state.questions[state.questionIndex];
//       //check if the payload data matches the current question option
//       const isCorrect = action.payload === currentQuestion.correctOption;
//       return {
//         ...state,
//         selectedAnswer: action.payload,
//         score: isCorrect ? state.score + currentQuestion.points : state.score,
//       };
//     case "newQuestion":
//       return {
//         ...state,
//         questionIndex: state.questionIndex + 1,
//         selectedAnswer: null,
//       };

//     case "finish":
//       return {
//         ...state,
//         selectedAnswer: null,
//         questionIndex: 0,
//         isStarted: false,
//         gameOver: true,
//       };
//     case "reset":
//       return initialState;
//     default:
//       return state;
//   }
// };

const LandingPage = () => {
  const {
    score,
    questions,
    questionIndex,
    isStarted,
    selectedAnswer,
    gameOver,
    strokeDashoffset,
    dispatch,
    radius,
    circumference,
    scorePercentage,
    totalPossibleScore,
  } = useQuiz();
  // const [score, setScore] = useState(0);
  // const { questions } = questionsData;
  // const [questionIndex, setQuestionIndex] = useState(0);
  // const [isStarted, setIsStarted] = useState(false);
  // const [selectedAnswer, setSelectedAnswer] = useState(null);
  // const [gameOver, setGameOver] = useState(false);

  // const [state, dispatch] = useReducer(reducer, initialState);
  // const {
  //   score,
  //   questions,
  //   questionIndex,
  //   isStarted,
  //   selectedAnswer,
  //   gameOver,
  // } = state;

  // Calculate total possible score

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
            <QuizScreen />
          )}
        </>
      ) : (
        /* ===== FINISH SCREEN ===== */
        <FinishScreen />
      )}
    </div>
  );
};

export default LandingPage;
