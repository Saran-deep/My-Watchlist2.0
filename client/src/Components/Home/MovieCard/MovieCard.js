// https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../../../UI/Image/Image";
import _ from "lodash";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IconContext } from "react-icons";
import {
  deleteFromWatchlist,
  resetShowNotification,
} from "../../../redux/Features/Watchlist/watchlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../../redux/Features/SnackBar/snackbarSlice";

function MovieCard({
  posterImageSmall,
  posterImageLarge,
  animeId,
  title,
  desc,
  generes,
  showRemoveBtn,
}) {
  const gradient = "linear-gradient(0deg, rgb(15,15,15) 50%)";

  return (
    <article className="cardImage movie-card relative w-full rounded overflow-hidden cursor-pointer">
      {showRemoveBtn ? (
        <RemoveButton doRemove={showRemoveBtn} animeId={animeId} />
      ) : (
        " "
      )}

      <Link to={`/anime/${animeId}`} className=" no-underline">
        <div className="w-full movie-card__poster relative overflow-hidden before:absolute before:content-[''] before:w-full before:h-full before:duration-300 before:-bottom-[170px] before:z-10">
          <div className=" w-full h-[285px]">
            <Image
              highQualityImageURL={posterImageLarge}
              lowQualityImageURL={posterImageSmall}
              className={
                " w-full h-full duration-500 swiper-lazy object-cover rounded"
              }
              alt={"Postser Image of " + title}
            />
          </div>
          <div className="swiper-lazy-preloader"></div>
          <p className="text-my-white-100 text-sm line-clamp-2 pt-2 ">
            {_.startCase(title.toLowerCase())}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;

const RemoveButton = ({ doRemove, animeId }) => {
  const dispatch = useDispatch();

  const { isLoading, animeRemoved } = useSelector((state) => state.watchlist);

  console.log(animeRemoved);

  useEffect(() => {
    if (animeRemoved) {
      dispatch(showSnackBar({ message: "Anime removed from your watchlist." }));
    }
    return () => {
      setTimeout(() => {
        dispatch(resetShowNotification());
      }, 2000);
    };
  }, [animeRemoved]);

  const removeFromList = (doRemove, animeId) => {
    if (!doRemove) return;
    dispatch(deleteFromWatchlist({ animeId: animeId }));
  };

  return (
    <div className="cardImage__removeBtn h-9 w-9 flex items-center justify-center absolute z-10 top-2 left-2 p-[2px] rounded-full bg-white opacity-0 invisible transition-all duration-100">
      <IconContext.Provider
        value={{
          className: `text-my-ebonyClay-400 ${isLoading ? "animate-spin" : ""}`,
          size: isLoading ? "23" : "30",
        }}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters />
        ) : (
          <IoCloseCircleOutline
            onClick={() => removeFromList(doRemove, animeId)}
          />
        )}
      </IconContext.Provider>
    </div>
  );
};
