import type { Progress } from "../types";

const ProgressBar = ({ length, questionIndex }: Progress) => {
  return (
    <>
      <div>
        <progress
          className="w-64 h-3 appearance-none overflow-hidden rounded-full 
                 [&::-webkit-progress-bar]:bg-slate-700 
                 [&::-webkit-progress-value]:bg-amber-500 
                 [&::-webkit-progress-value]:transition-all 
                 [&::-webkit-progress-value]:duration-500
                 [&::-moz-progress-bar]:bg-amber-500"
          max={length}
          value={questionIndex}
        ></progress>
      </div>
    </>
  );
};

export default ProgressBar;
