import { useQuery } from "@apollo/client";
import React from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../Components/Home/MovieCard/MovieCard";
import { SEARCH_ANIME } from "../GraphQl/Queries";
import Skeleton from "../UI/Skeleton/Skeleton";

function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

  console.log(searchTerm);

  const {
    loading: loading,
    error: error,
    data: searchResult,
  } = useQuery(SEARCH_ANIME, {
    variables: {
      search: searchTerm,
    },
  });

  const dummyArray = Array.from(new Array(12));

  if (loading)
    return (
      <div className="grid grid-cols-watchlist gap-3">
        {dummyArray.map((_, index) => (
          <div key={index}>
            <Skeleton className="w-full !h-[285px]" />
          </div>
        ))}
      </div>
    );

  const {
    animeDetails: { media },
  } = searchResult;

  console.log(media);

  return (
    <div className="grid grid-cols-2 phone:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
      {media.map((anime, index) => {
        return (
          <div className="max-w-[210px]" key={index}>
            <MovieCard
              animeId={anime.id}
              posterImageSmall={anime.coverImage.medium}
              posterImageLarge={anime.coverImage.extraLarge}
              desc={anime.description}
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
}

export default SearchResult;
