import React from "react";

export default function LoadPage({ message = "Loading" }) {
  return (
    <div className="row h-100 p-4">
      <div className="col-sm-6 m-auto p-4">
        <div className="loading-page"></div>
        <div className="text-center">{message}</div>
      </div>
    </div>
  );
}
