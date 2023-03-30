import React, { useEffect } from "react";
import Badge from "../../../UI/Badge/Badge";
import MetaData from "../../../UI/MetaData/MetaData";
import Skeleton from "../../../UI/Skeleton/Skeleton";
import AddToWatchlistButton from "../../AddToWatchlistButton";

function HeroSection({ heroData, isLoading }) {
  if (isLoading) return <Skeleton className="h-3/4 w-full" />;

  const bannerImage = heroData[0].bannerImage;
  const title = heroData[0].title.english
    ? heroData[0].title.english
    : heroData[0].title.userPreferred;
  const color = heroData[0].coverImage.color;

  let watchlistingDetails;

  if (heroData) {
    const { status } = heroData[0];
    watchlistingDetails = {
      animeId: heroData[0].id,
      nextAiringEpisode: heroData[0].nextAiringEpisode,
      isAiring:
        status !== "NOT_YET_RELEASED" &&
        status !== "FINISHED" &&
        status !== "CANCELLED" &&
        status !== "HIATUS",
    };
  }

  return (
    <>
      <div
        id="heroSection"
        className="h-3/4 rounded relative"
        style={{ backgroundColor: color }}
      >
        {bannerImage && (
          <img
            src={bannerImage}
            className="object-cover w-full h-full rounded"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-my-ebonyClay-100">
          <div className="flex items-end h-full">
            <div className="mb-16 pl-10 self-end space-y-3.5 last:after:content-['\B7']">
              <h1 className="text-5xl text-white">{title}</h1>
              <div className="">
                <MetaData items={["2020", "Action", "Drama"]} />
              </div>
              <p className=" text-my-white-100">
                Status: <Badge>COMPLETED</Badge>
              </p>
              <AddToWatchlistButton detail={watchlistingDetails} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
