import React from "react";
import axios from "axios";
import QuestionItem from "./QuestionItem";
import LoginPage from "./LoginPage";
import StartPage from "./StartPage";
import FinishPage from "./FinishPage";
import { baseUrl, requestOptions, formatDuration } from "./utils";

export default function Quiz({ code = "", goHome, onCodeChange }) {
  const [password, setPassword] = React.useState("");
  const [quiz, setQuiz] = React.useState(null);
  const [quizSolutions, setQuizSolutions] = React.useState({});
  const [question, setQuestion] = React.useState(0);
  const [loginError, setLoginError] = React.useState(null);
  const [timer, setTimer] = React.useState(0);
  const [timerMgr, setTimerMgr] = React.useState(null);
  const [quizState, setQuizState] = React.useState("LOGOUT");
  const [lastQuestion, setLastQuestion] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [submitStatus, setSubmitStatus] = React.useState('NOT-SUBMITTED');
  const [startTime, setStartTime] = React.useState(0);

  const setupSolnForSubmission =  React.useCallback(() => {
    if(quizState === 'FINISHED' && submitStatus === 'READY'){
    var submission = {};
    submission.submissionInfo = {};
    submission.submissionInfo.quizId = quiz.quizInfo.id;
    submission.submissionInfo.fullName = userName;
    submission.submissionInfo.launchedAt = startTime;
    submission.submissionInfo.company = company;
    submission.submissions = [];
    for(var i=0;i<quiz.quizQuestions.length;i++){
      var s = {};
      s.questionId = quiz.quizQuestions[i].id;
      if(quiz.quizQuestions[i].questionType === "TEXT" && quizSolutions[s.questionId]){
        s.answerText = quizSolutions[s.questionId];
        submission.submissions.push(s);
      }
      else if(quiz.quizQuestions[i].questionType === "OPTIONS" && quizSolutions[s.questionId].length>0){
        s.answerId = quizSolutions[s.questionId][0];
        submission.submissions.push(s);
      }
      else if(quiz.quizQuestions[i].questionType === "MULTIOPTION" && quizSolutions[s.questionId].length>0){
        s.answersId = quizSolutions[s.questionId];
        submission.submissions.push(s);
      }
    }
    return submission;
  }
  },[quiz,userName,startTime,quizSolutions, company, quizState, submitStatus]);

  React.useEffect(() => {
    if (quizState === "LOADING") {
      axios
        .post(
          baseUrl + "/get",
          { quizId: code, passcode: password },
          requestOptions
        )
        .then(
          rsp => {
            if (rsp.data.success) {
              if (rsp.data.response.quizQuestions.length === 0) {
                setQuizState("LOGOUT");
                setLoginError("There are no questions in this quiz");
              } else {
                setLoginError(null);
                setQuiz(rsp.data.response);
                setTimer(rsp.data.response.quizInfo.duration);
                setQuizState("LOGGEDIN");
              }
            } else {
              setQuizState("LOGOUT");
              setLoginError(rsp.data.message);
            }
          },
          e => {
            setQuizState("LOGOUT");
            setLoginError("We were unable to get quiz");
          }
        );
    } else if (quizState === "STARTED" && startTime===0) {
      setStartTime(new Date().getTime());
      setTimerMgr(setInterval(countDownTimer, 1000));
    }
    else if(quizState === 'FINISHED' && submitStatus === 'READY'){
      //console.log('call api to submit here');
      var s = setupSolnForSubmission();
      console.log(s);
      axios.post(
        baseUrl + "/submit", s, requestOptions
      ).then(
        rsp => {
            setSubmitStatus('DONE');
        }, e => {
          console.log('error submitting');
          setSubmitStatus('DONE');
        }
      )
    }
  }, [quizState, code, password, submitStatus,setupSolnForSubmission, startTime]);

  React.useEffect(() => {
    if (timer === 0 && timerMgr) {
      clearInterval(timerMgr);
      setQuizState("FINISHED");
      setSubmitStatus('READY')
    }
  }, [timer, timerMgr]);

  React.useEffect(() => {
    if (quiz) {
      setLastQuestion(question === quiz.quizQuestions.length - 1);
    }
  }, [question, quiz]);

  function onChangeQuestion(forward) {
    if (forward && !lastQuestion) {
      setQuestion(question => question + 1);
    }
    if (!forward) {
      setQuestion(question => question - 1);
    }
    if (forward && lastQuestion) {
      setQuizState("FINISHED");
    }
  }

  

  function onClickLogin(evt) {
    evt.preventDefault();
    setQuizState("LOADING");
  }

  function countDownTimer() {
    setTimer(timer => timer - 1);
  }

  function answerQuestion(ans) {
    var qType = quiz.quizQuestions[question].questionType;
    var qid = quiz.quizQuestions[question].id;
    if (qType === "TEXT") {
      setQuizSolutions(prevState => ({
        ...prevState,
        [qid]: ans
      }));
    } else if (qType === "MULTIOPTION") {
      if (!quizSolutions[qid]) {
        setQuizSolutions(prevState => ({
          ...prevState,
          [qid]: [ans]
        }));
      } else if (!quizSolutions[qid].includes(ans)) {
        setQuizSolutions(prevState => ({
          ...prevState,
          [qid]: [...prevState[qid], ans]
        }));
      } else {
        setQuizSolutions(prevState => ({
          ...prevState,
          [qid]: [
            ...prevState[qid].filter(function(value, index, arr) {
              return value !== ans;
            })
          ]
        }));
      }
    } else if (qType === "OPTIONS") {
      setQuizSolutions(prevState => ({
        ...prevState,
        [qid]: [ans]
      }));
    }
  }

  if (quizState === "LOGOUT" || quizState === "LOADING") {
    return (
      <LoginPage
        codeVar={code}
        load={quizState === "LOADING"}
        password={password}
        error={loginError}
        onClickLogin={evt => onClickLogin(evt)}
        onPasswordChange={e => setPassword(e.target.value)}
        onCodeChange={onCodeChange}
        onCancelLogin={() => goHome()}
      />
    );
  } else if (quizState === "LOGGEDIN") {
    return (
      <StartPage
        name={userName}
        company={company}
        onStartQuiz={() => setQuizState("STARTED")}
        onCompanyChange={evt => setCompany(evt.target.value)}
        onNameChange={evt => setUserName(evt.target.value)}
        quizInfo={quiz.quizInfo}
      />
    );
  } else if (quizState === "STARTED" || quizState === "CONTINUE") {
    var currentSol = quizSolutions[quiz.quizQuestions[question].id];
    return (
      <>
        <div className="text-center">
          <span
            className={`p-2 badge badge-pill badge-${
              timer < 300 && timer % 2 === 0 ? "danger" : "warning"
            } border text-light`}
          >
            {formatDuration(timer, false)} | {quiz.quizQuestions.length}{" "}
            Questions
          </span>
        </div>
        <div className="row h-100 p-1">
          <div className="col-sm-2 m-auto p-2 text-center">
            <h1>
              {question === 0 ? (
                <></>
              ) : (
                <em
                  onClick={() => onChangeQuestion(false)}
                  className="text-muted fa fa-arrow-circle-left"
                />
              )}
            </h1>
          </div>
          <div className="col-sm-8 h-100 border">
            <QuestionItem
              question={quiz.quizQuestions[question].questionText}
              position={quiz.quizQuestions[question].identifier}
              questionType={quiz.quizQuestions[question].questionType}
              choices={quiz.quizQuestions[question].questionChoices}
              selectChoices={currentSol}
              answer={currentSol}
              answerQuestion={e => answerQuestion(e)}
            />
            <div className="m-5">
              <button
                onClick={e => onChangeQuestion(true)}
                className={`btn btn-${
                  lastQuestion ? "success" : "info"
                } btn-block`}
              >
                {lastQuestion ? "FINISH" : "NEXT"}
              </button>
            </div>
          </div>
          <div className="col-sm-2 m-auto p-2 text-center">
            <h1>
              {lastQuestion ? (
                <></>
              ) : (
                <em
                  onClick={() => onChangeQuestion(true)}
                  className="text-muted fa fa-arrow-circle-right"
                />
              )}
            </h1>
          </div>
        </div>
      </>
    );
  } else if (quizState === "FINISHED") {
    return (
      <FinishPage
        goHome={goHome}
        timer={timer}
        endTimer={() => {setTimer(0)}}
        answered={Object.keys(quizSolutions).length}
        total={quiz.quizQuestions.length}
        goBackToQuiz={() => {
          setQuizState("CONTINUE");
        }}
        submitStatus={submitStatus}
      />
    );
  }
  return <></>;
}
