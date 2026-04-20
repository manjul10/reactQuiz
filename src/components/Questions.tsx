const Questions = ({
  question,
  setScore,
  selectedAnswer,
  setSelectedAnswer,
}: any) => {
  const { options } = question;

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);

    if (index === question.correctOption) {
      setScore((prev: number) => prev + question.points);
    }
  };
  return (
    <div>
      <>
        <h1>{question.question}</h1>
        <ul className="flex flex-col gap-5">
          {options.map((option: [], index: number) => {
            return (
              <li
                key={index}
                className={`w-full hover:bg-gray-800 cursor-pointer text-white mt-2 p-2 rounded-4xl pl-6 font-medium text-2xl ${
                  selectedAnswer !== null
                    ? index === question.correctOption
                      ? "bg-green-600 hover:bg-green-400"
                      : "bg-orange-700"
                    : " bg-gray-600"
                }`}
                onClick={() => handleSelect(index)}
              >
                {" "}
                {option}
              </li>
            );
          })}
        </ul>
      </>
    </div>
  );
};

export default Questions;
