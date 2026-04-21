import { createContext, useContext } from "react";

import { useReducer } from "react";
import questionsData from "../assets/questions.json";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    score,
    questions,
    questionIndex,
    isStarted,
    selectedAnswer,
    gameOver,
  } = state;
  const totalPossibleScore = questions.reduce(
    (acc: any, q: any) => acc + q.points,
    0,
  );
  const scorePercentage = Math.round((score / totalPossibleScore) * 100);
  const length = questions.length;
  // SVG circle math for score ring
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scorePercentage / 100) * circumference;
  return (
    <QuizContext.Provider
      value={{
        score,
        questions,
        questionIndex,
        isStarted,
        selectedAnswer,
        gameOver,
        strokeDashoffset,
        radius,
        circumference,
        scorePercentage,
        totalPossibleScore,
        length,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context was used outside the QuizProvider");
  return context;
}
export { useQuiz, QuizProvider };
