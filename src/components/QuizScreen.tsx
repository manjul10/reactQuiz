import { useQuiz } from "../context/QuizContext";
import ProgressBar from "./ProgressBar";
import Questions from "./Questions";
import Timer from "./Timer";

const QuizScreen = () => {
  const { questionIndex, questions, score, selectedAnswer, dispatch } =
    useQuiz();
  return (
    <div className="glass-card w-full max-w-2xl p-8 md:p-10 animate-scale-in">
      {/* Top bar: Counter + Progress + Score */}
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div className="question-counter animate-slide-in-left">
          Question {questionIndex + 1}
          <span className="text-white/30"> / {questions.length}</span>
        </div>

        <ProgressBar />

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
        <Questions />
      </div>

      {/* Bottom bar: Timer + Next */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
        <Timer
        // length={questions.length}
        // setGameOver={() => dispatch({ type: "reset" })}
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
                questionIndex < questions.length - 1 ? "newQuestion" : "finish",
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
  );
};

export default QuizScreen;
