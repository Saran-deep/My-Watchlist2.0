import React from "react";
import Image from "../../../UI/Image/Image";

function CoverImage({ coverImage, isLoading, color }) {
  return (
    <div
      className="h-full w-full rounded relative overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {isLoading ? null : coverImage ? (
        <Image
          highQualityImageURL={coverImage}
          lowQualityImageURL={coverImage}
          alt="anime coverimage"
          className="object-cover w-full h-full rounded"
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-my-ebonyClay-100"></div>
    </div>
  );
}

export default CoverImage;
