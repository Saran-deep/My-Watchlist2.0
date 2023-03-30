import React, { useEffect, useState } from "react";
import MovieCard from "../Components/Home/MovieCard/MovieCard";
import { GET_ANIMES_OF_WATCHLIST } from "../GraphQl/Queries";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import {
  usersWatchList,
  loadingState,
} from "../redux/Features/Watchlist/watchlistSlice";
import Skeleton from "../UI/Skeleton/Skeleton";

function Watchlist() {
  const extractAnimeId = (watchlist) => {
    if (!watchlist) return [];
    return watchlist.map((item) => item.animeId);
  };

  const usersWatchlistInfo = useSelector(usersWatchList);
  const internalLoading = useSelector(loadingState);

  const animeIds = extractAnimeId(usersWatchlistInfo);

  const {
    loading: loading,
    error: error,
    data: responseData,
  } = useQuery(GET_ANIMES_OF_WATCHLIST, {
    variables: {
      ids: animeIds,
    },
    skip: !animeIds || animeIds.length === 0,
  });

  if (!usersWatchlistInfo || usersWatchlistInfo.length === 0)
    return <h1 className=" p-4 text-white">No records found</h1>;

  return (
    <>
      <RenderList
        isLoading={loading || internalLoading}
        details={responseData}
      />
    </>
  );
}

export default Watchlist;

const RenderList = ({ isLoading, details }) => {
  const [showLoader, setShowLoader] = useState(true);
  const dummyArray = Array.from(new Array(12));

  useEffect(() => {
    if (!isLoading) {
      setShowLoader(false);
    }
  }, [isLoading]);

  if (showLoader)
    return (
      <div className="grid grid-cols-watchlist gap-3">
        {dummyArray.map((_, index) => (
          <div key={index}>
            <Skeleton className="w-full !h-[285px]" />
          </div>
        ))}
      </div>
    );

  if (!details) return setShowLoader(true);

  const { animeDetails } = details;

  const watchlistDetails = animeDetails.media;

  return (
    <div className="grid grid-cols-2 phone:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
      {watchlistDetails.map((anime, index) => {
        return (
          <div className="" key={index}>
            <MovieCard
              animeId={anime.id}
              posterImageSmall={anime.coverImage.medium}
              posterImageLarge={anime.coverImage.extraLarge}
              desc={anime.description}
              showRemoveBtn={true}
              title={
                anime.title.english
                  ? anime.title.english
                  : anime.title.userPreferred
              }
              genres={anime.genres}
            />
          </div>
        );
      })}
    </div>
  );
};
