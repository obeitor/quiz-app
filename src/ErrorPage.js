import React from "react";

export default function ErrorPage({
  message = "Oops, There was an error",
  type = "ERROR"
}) {
  return (
    <div className="row h-100 p-5">
      <div className="col-sm-6 m-auto text-center">
        <div
          className={`badge badge-pill badge-${
            type === "WARN" ? "warning" : "danger"
          } p-3`}
        >
          <i className="fa fa-exclamation-circle" />
          &nbsp;{message}&nbsp;
          <i className="fa fa-exclamation-circle" />
        </div>
      </div>
    </div>
  );
}
