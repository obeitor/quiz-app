import React from "react";
import formatDuration from "./utils";

export default function QuizInfo({
  title,
  description,
  start,
  end = "",
  code,
  id,
  duration,
  status = "INACTIVE",
  goToQuiz
}) {
  function PrintDate({ date }) {
    const optional = { year: "numeric", month: "short", day: "numeric" };
    const dateString = new Date(date).toLocaleDateString(undefined, optional);
    return <>{date ? dateString : "NA"}</>;
  }

  function PrintExpDate() {
    const exp = status.toUpperCase() === "EXPIRED";
    return (
      <>
        {end ? (
          <span
            className={`text-light badge shadow-sm badge-pill badge-${
              exp ? "danger" : "warning"
            } float-right`}
          >
            {exp ? "Expired" : "Expires"}: <PrintDate date={end} />
          </span>
        ) : (
          <></>
        )}
      </>
    );
  }

  function StartButton() {
    const isActive = status.toUpperCase() === "ACTIVE";
    return (
      <button
        className={`btn btn-block btn-outline-${
          isActive ? "info" : "secondary"
        }`}
        disabled={!isActive}
        value={code}
        onClick={goToQuiz}
      >
        {isActive ? "START" : status.toUpperCase()}
      </button> //}</>
    );
  }

  return (
    <div className={"col-md-4 col-xs-12"}>
      <div className={"card m-1 shadow"}>
        <div
          className={`card-header border text-center ${
            status.toUpperCase() !== "AIVE"
              ? "text-light bg-info"
              : "text-muted bg-warning"
          }`}
        >
          <h5>{title}</h5>
        </div>
        <div className={"card-body"}>
          <p>{description}</p>
          <div>
            <PrintExpDate />
            <span className="text-light badge badge-pill badge-secondary float-left">
              {" "}
              <strong>{code}</strong>
            </span>
          </div>
        </div>
        <div className={"card-footer container-fluid px-5 py-3"}>
          <div className="text-center pb-2 text-info">
            <strong>
              <i className="fa fa-clock-o" aria-hidden="true" />{" "}
              {formatDuration(duration, true)}
            </strong>
          </div>
          <StartButton />
        </div>
      </div>
    </div>
  );
}
