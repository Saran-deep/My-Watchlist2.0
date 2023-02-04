import React, { useState } from "react";
import Image from "../../../UI/Image/Image";
import Skeleton from "../../../UI/Skeleton/Skeleton";

function ImagePoster({ poster, isLoading, lowQualityPoster }) {
  return (
    <article className="movie-card">
      <div className="h-[322px]  w-[215px] rounded">
        {isLoading ? (
          <Skeleton />
        ) : (
          <Image
            className={"w-full h-full duration-500 rounded shadow-2xl object-cover"}
            lowQualityImageURL={lowQualityPoster}
            highQualityImageURL={poster}
          />
        )}
      </div>
    </article>
  );
}

export default ImagePoster;
