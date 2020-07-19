import React from "react";

export default function OptionItem({
  text = "Option",
  selected = false,
  id,
  answerQuestion
}) {
  return (
    <div
      onClick={() => answerQuestion(id)}
      className={`row card p-1 m-1 text-muted ${
        selected ? "bg-warning shadow" : ""
      }`}
    >
      <span className={"p-3"}>
        <em
          className={`fa fa-circle${selected ? "" : "-o"} pr-2 border-right`}
        />
        <span className={"pl-2"}>{text}</span>
      </span>
    </div>
  );
}
