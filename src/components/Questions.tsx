const Questions = ({ question, selectedAnswer, dispatch }: any) => {
  // const { options } = question;

  // const handleSelect = (index: number) => {
  //   if (selectedAnswer !== null) return;
  //   setSelectedAnswer(index);

  //   if (index === question.correctOption) {
  //     setScore((prev: number) => prev + question.points);
  //   }
  // };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="w-full">
      <h2 className="question-text mb-7">{question?.question}</h2>
      <ul className="flex flex-col gap-3">
        {question &&
          question.options.map((option: [], index: number) => {
            let stateClass = "";
            if (selectedAnswer !== null) {
              if (index === question.correctOption) {
                stateClass = "correct";
              } else {
                stateClass = "wrong";
              }
              stateClass += " disabled";
            }

            return (
              <li
                key={index}
                className={`option-btn ${stateClass}`}
                style={{
                  animationName: "fadeInUp",
                  animationDuration: "0.4s",
                  animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  animationFillMode: "backwards",
                  animationDelay: `${index * 80}ms`,
                }}
                onClick={() => dispatch({ type: "newAnswer", payload: index })}
              >
                <span className="flex items-center">
                  <span className="option-index">{optionLabels[index]}</span>
                  {option}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Questions;
