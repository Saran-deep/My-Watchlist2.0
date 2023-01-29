import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CastAndCrew from "../Components/DetailedView/CastAndCrew/CastAndCrew";
import CoverImage from "../Components/DetailedView/CoverImage.js/CoverImage";
import ImagePoster from "../Components/DetailedView/ImagePoster/ImagePoster";
import MovieDetails from "../Components/DetailedView/MovieDetails/MovieDetails";
import {
  selectAnimeDetails,
  getAnime,
  resetState,
} from "../redux/Features/Anime/animeSlice";

function DetailedView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, error, status } = useSelector((state) => state.anime);
  const animeDetails = useSelector(selectAnimeDetails);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAnime(parseInt(id)));
    return () => dispatch(resetState());
  }, []);

  console.log(isLoading);

  return (
    <section>
      <div className=" w-full flex justify-center h-screen relative">
        <div className="w-full h-1/3 md:h-2/4 lg:h-2/3 rounded">
          <CoverImage
            coverImage={animeDetails?.bannerImage}
            isLoading={isLoading}
            color={animeDetails?.coverImage.color}
          />
        </div>
        <div className="w-full absolute z-10 top-[15%] md:top-1/3 lg:top-1/2">
          <div className="w-full grid gap-3 md:gap-0 xl:grid-cols-[250px_minmax(540px,_1fr)_315px] md:grid-cols-[250px,_1fr]">
            <div className="flex justify-center">
              <ImagePoster
                poster={animeDetails?.coverImage.extraLarge}
                lowQualityPoster={animeDetails?.coverImage.medium}
                isLoading={isLoading}
                color={animeDetails?.coverImage.color}
              />
            </div>
            <div className="">
              <MovieDetails
                details={animeDetails ? animeDetails : null}
                isLoading={isLoading}
              />
            </div>
            <div className="max-w-[340px] mx-auto md:col-start-2 md:col-end-3 md:mx-0 xl:col-start-auto xl:col-end-auto">
              <CastAndCrew
                cast={animeDetails?.characters.edges}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailedView;
