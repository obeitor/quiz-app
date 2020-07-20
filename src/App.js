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
        <div className='p-0 mt-0 mb-2 mx-3 row'>
          <div className='col-md-3 hidden-sm'></div>
            <div className='col-sm-12 col-md-6'>
              <div className="row">
                <button onClick={evt => goToQuiz(evt)} value="" className="col-sm-5 btn btn-outline-secondary"><em className='fa fa-user-secret'></em> Private</button>
                <div className="col-sm-2"></div>
                <button className="col-sm-5 btn btn-light"><em className='fa fa-user'></em> Admin</button>
              </div>
            </div>
          </div>
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
