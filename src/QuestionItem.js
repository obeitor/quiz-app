import React from "react";
import TextAnswer from "./TextAnswer";
import OptionItem from "./OptionItem";

export default function QuestionItem({
  question = "Select One",
  position = 1,
  questionType = "OPTION",
  choices,
  selectChoices = [],
  answer = "",
  answerQuestion
}) {
  if (choices) {
    var options = [];
    for (var i = 0; i < choices.length; i++) {
      options.push(
        <OptionItem
          text={choices[i].choiceText}
          key={choices[i].id}
          id={choices[i].id}
          selected={selectChoices.includes(choices[i].id)}
          answerQuestion={answerQuestion}
        />
      );
    }
  }

  return (
    <>
      <div className="border-bottom px-2 py-3 mb-3 text-center font-weight-bold text-muted">
        <span className="p-2">{position}.</span>
        {questionType === "MULTIOPTION" ?
        (<span className="p-2 badge badge-pill badge-success text-light">MULTIPLE CHOICE</span>):(<></>)}
        {question}
      </div>
      <div className="text-muted">
        {questionType === "TEXT" ? (
          <TextAnswer answer={answer} answerQuestion={answerQuestion} />
        ) : (
          <>{options}</>
        )}
      </div>
    </>
  );
}
