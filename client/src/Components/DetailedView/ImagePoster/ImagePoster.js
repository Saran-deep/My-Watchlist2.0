import React from "react";

function ImagePoster() {
  const poster =
    "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg";
  return (
    <article className="movie-card w-[185px]  ">
      <div className=" h-[265px] overflow-hidden rounded">
        <img
          className="w-full h-full duration-500"
          alt="movie poster"
          src={poster}
        />
      </div>
    </article>
  );
}

export default ImagePoster;
