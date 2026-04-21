import type { Progress } from "../types";

const ProgressBar = ({ length, questionIndex }: Progress) => {
  const percentage = (questionIndex / length) * 100;

  return (
    <div className="progress-track mx-4">
      <div
        className="progress-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
