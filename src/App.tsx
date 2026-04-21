import { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <QuizProvider>
      <LandingPage />
    </QuizProvider>
  );
}

export default App;
