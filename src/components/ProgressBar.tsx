import { useQuiz } from "../context/QuizContext";
// import type { Progress } from "../types";

const ProgressBar = () => {
  const { length, questionIndex } = useQuiz();
  const percentage = (questionIndex / length) * 100;
  return (
    <div className="progress-track mx-4">
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
