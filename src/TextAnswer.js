import React from "react";

export default function TextAnswer({ answer = "", answerQuestion }) {
  return (
    <div className="border shadow">
      <textarea
        className="form-control"
        onChange={e => answerQuestion(e.target.value)}
        value={answer}
        rows="3"
      />
    </div>
  );
}
