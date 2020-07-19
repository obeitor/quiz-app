import React from "react";
import formatDuration from "./utils";

export default function StartPage({
  name = "",
  company = "",
  onStartQuiz,
  onCompanyChange,
  onNameChange,
  quizInfo
}) {
  return (
    <>
      <div className="row h-100 px-5">
        <div className="col-sm-6 m-auto p-0 card shadow">
          <form onSubmit={onStartQuiz}>
            <div className="card-header border shadow-sm text-muted text-center">
              <h5>{quizInfo.title}</h5>
              <h6>{quizInfo.description}</h6>
              <h6>Duration: {formatDuration(quizInfo.duration, true)}</h6>
            </div>
            <div className="card-body m-3">
              <div className="form-group text-muted">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  className="form-control"
                  id="name"
                  onChange={onNameChange}
                />
              </div>
              <div className="form-group text-muted">
                <label htmlFor="company">Company Name:</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={company}
                  className="form-control"
                  id="company"
                  onChange={onCompanyChange}
                />
              </div>
              <div className="form-group px-5 row">
                <button type="submit" className="btn btn-block btn-danger">
                  START
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
