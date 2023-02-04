import React from "react";

function AuthCard({ children }) {
  return (
    <div className=" bg-my-ebonyClay-200 rounded shadow-lg w-96 p-6 text-center space-y-4">
      {children}
    </div>
  );
}

export default AuthCard;
