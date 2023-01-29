import React from "react";

function MetaData({ items }) {
  return items.map((item) => (
    <span className="text-my-white-200 font-medium meta-data" key={item}>
      {item}
    </span>
  ));
}

export default MetaData;
