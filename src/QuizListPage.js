import React from "react";
import axios from "axios";
import QuizInfo from "./QuizInfo";
import LoadPage from "./LoadPage";
import ErrorPage from "./ErrorPage";
import { baseUrl, requestOptions } from "./utils";

export default function QuizListPage({ goToQuiz }) {
  const [quizs, setQuizs] = React.useState(null);
  const [status, setStatus] = React.useState("P");
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setStatus("P");
    axios
      .get(baseUrl + "/get-available", requestOptions)
      .then(quizData => {
        if (quizData.data.success && quizData.data.responseType === "LIST") {
          if (quizData.data.response.length === 0) {
            setStatus("W");
            setError(
              "There is no available quiz at the moment. Please come back later."
            );
          } else {
            var qzs = [];
            for (var i = 0; i < quizData.data.response.length; i++) {
              var q = quizData.data.response[i];
              qzs.push(
                <QuizInfo
                  goToQuiz={e => goToQuiz(e)}
                  key={q.id}
                  title={q.title}
                  description={q.description}
                  code={q.quizCode}
                  id={q.id}
                  start={q.startDate}
                  end={q.endDate}
                  status={q.status}
                  duration={q.timed ? q.duration : 0}
                />
              );
            }
            setStatus("D");
            setQuizs(qzs);
          }
        } else {
          setStatus("E");
          setError(quizData.data.message);
        }
      })
      .catch(e => {
        console.log(e.message);
        setStatus("E");
      });
  }, [goToQuiz]);

  if (status === "P") {
    return <LoadPage />;
  }
  if (status === "E") {
    return error ? <ErrorPage message={error} /> : <ErrorPage />;
  }
  if (status === "W") {
    return error ? (
      <ErrorPage message={error} type={"WARN"} />
    ) : (
      <ErrorPage type={"WARN"} />
    );
  }
  if (status === "D") {
    return <div className="row container-fluid">{quizs}</div>;
  }

  return <></>;
}
