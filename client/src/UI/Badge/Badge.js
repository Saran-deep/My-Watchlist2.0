import React from "react";

function Badge(props) {
  return (
    <span className=" px-1 font-medium bg-my-black-200 text-white align-middle rounded-sm ">
      <span>{props.children}</span>
    </span>
  );
}

export default Badge;
