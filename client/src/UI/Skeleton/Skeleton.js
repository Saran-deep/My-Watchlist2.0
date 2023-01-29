import React from "react";

function Skeleton({ className }) {
  return (
    <div
      className={`h-full w-full bg-skeleton-color animate-pulse rounded ${className}`}
      id="loader"
    ></div>
  );
}

export default Skeleton;
