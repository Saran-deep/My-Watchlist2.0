import React from "react";

function Button(props) {
  const { primary, children } = props;
  return (
    <a
      className={`px-4 py-2 inline-block border-none no-underline rounded-full font-medium ${
        primary ? " bg-my-white-100 text-my-black-100" : " "
      }`}
      href="#"
    >
      {children}
    </a>
  );
}

export default Button;
