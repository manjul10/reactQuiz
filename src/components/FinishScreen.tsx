import { useQuiz } from "../context/QuizContext";

const FinishScreen = () => {
  const {
    radius,
    circumference,
    strokeDashoffset,
    scorePercentage,
    totalPossibleScore,
    questions,
    dispatch,
  } = useQuiz();
  return (
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
          <span className="text-white/40 text-sm font-medium mt-1">Score</span>
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
        <span className="text-indigo-400 font-semibold">{score}</span> out of{" "}
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
  );
};

export default FinishScreen;
