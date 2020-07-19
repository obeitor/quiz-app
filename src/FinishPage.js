import React from "react";

export default function FinishPage({
  goHome,
  goBackToQuiz,
  total = 0,
  answered = 0
}) {
  return (
    <>
      <div className="row h-100 px-5">
        <div className="col-sm-6 m-auto p-0 card shadow" />
      </div>
    </>
  );
}
