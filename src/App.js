import React from "react";
import "./styles.css";
import QuizListPage from "./QuizListPage";
import Quiz from "./Quiz";

export default function App() {
  const [appState, setAppState] = React.useState("HOME");
  const [code, setCode] = React.useState("");

  function goToQuiz(evt) {
    setAppState("QUIZPAGE");
    setCode(evt ? evt.target.value : "");
  }

  if (appState === "HOME") {
    return (
      <>
        <QuizListPage goToQuiz={e => goToQuiz(e)} />
      </>
    );
  }
  if (appState === "QUIZPAGE") {
    return (
      <Quiz
        code={code}
        goHome={() => {
          setAppState("HOME");
          setCode("");
        }}
        onCodeChange={e => setCode(e.target.value)}
      />
    );
  }
}
