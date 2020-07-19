import React from "react";

export default function LoginPage({
  codeVar = "",
  password = "",
  onClickLogin,
  load = false,
  error,
  onPasswordChange,
  onCodeChange,
  onCancelLogin
}) {
  return (
    <div className="row h-100 px-5">
      <div className="col-sm-6 m-auto p-0 card shadow rounded">
        <form onSubmit={onClickLogin}>
          <div className="card-header border text-center text-light bg-success">
            <h5>Begin Test</h5>
          </div>
          <div className="card-body m-3">
            <div className="form-group text-muted">
              <label htmlFor="code">Quiz Code: </label>
              <input
                type="text"
                value={codeVar}
                className="form-control"
                id="code"
                onChange={onCodeChange}
              />
            </div>
            <div className="form-group text-muted">
              <label htmlFor="pwd">
                Password <span className="badge badge-light">If Provided</span>
              </label>
              <input
                type="password"
                value={password}
                className="form-control"
                id="pwd"
                onChange={onPasswordChange}
              />
            </div>
            <div className="text-danger text-center p-2">{error}</div>
            <div className="form-group px-5 row">
              <button
                type="submit"
                className="btn btn-info btn-block col-sm-5"
                disabled={load}
              >
                {load ? (
                  <span className="spinner-grow spinner-grow-sm" />
                ) : (
                  <></>
                )}
                GO
              </button>
              <div className="col-sm-2" />
              <button
                type="button"
                onClick={onCancelLogin}
                className="btn btn-light btn-block col-sm-5"
              >
                CANCEL
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
