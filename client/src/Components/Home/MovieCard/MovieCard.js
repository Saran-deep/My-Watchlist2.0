// https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg
import React from "react";

function MovieCard({
  posterImageSmall,
  posterImageLarge,
  title,
  desc,
  generes,
}) {
  const gradient = "linear-gradient(0deg, rgb(15,15,15) 50%)";

  return (
    <article className="movie-card relative w-[100%] h-64 rounded overflow-hidden cursor-pointer">
      <div className="movie-card__poster relative overflow-hidden before:absolute before:content-[''] before:w-full before:h-full before:duration-300 before:-bottom-[170px] before:z-10">
        <img
          className=" w-full duration-500 swiper-lazy"
          alt="movie poster"
          data-src={posterImageLarge}
          // data-srcSet={posterImageLarge + " 2x"}
        />
        <div className="swiper-lazy-preloader"></div>
      </div>
      <div className="movie-card__details absolute bottom-[-98px] left-0 px-2 py-1 w-full z-20 duration-[450ms]">
        <h2 className=" text-my-white-100 text-sm line-clamp-2">{title}</h2>
        <p className=" text-my-white-200 font-medium text-xs">
          <span>Action</span>, <span>Fantasy</span>, <span>Drama</span>
        </p>
        <div>
          <p className="text-my-white-100 leading-5 font-light text-xs line-clamp-2">
            {desc}
          </p>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
