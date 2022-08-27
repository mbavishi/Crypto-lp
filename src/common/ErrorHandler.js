import * as React from "react";

const ErrorHandler = ({ error }) => {
  return (
    <>
      {/* error alert */}
      <div role="alert">
        <span className="text-white">An error occurred:</span>
        <pre className="text-white">{error.message}</pre>
      </div>
    </>
  );
};

export default ErrorHandler;
