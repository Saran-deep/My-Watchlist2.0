import React, { useEffect } from "react";
import Button from "../../../UI/Button/Button";
import MetaData from "../../../UI/MetaData/MetaData";
import Skeleton from "../../../UI/Skeleton/Skeleton";
import SubDetails from "./SubDetails";

function MovieDetails(props) {
  const { details, isLoading } = props;

  const metaItems = [
    "Series (1999 - )",
    `Episodes: ${details?.episodes}`,
    `Format: ${details?.format}`,
    `Status: ${
      details?.status === "RELEASING"
        ? "Airing"
        : details?.status.charAt(0).toUpperCase() + details?.status.slice(1)
    }`,
  ];

  console.log(details);

  const getStudioNames = (studios) => {
    return studios?.edges
      .filter((edge) => edge.node.isAnimationStudio === true)
      .map((studio) => studio.node.name);
  };

  const formatString = (str) => {
    let formattedString = str?.toLowerCase().replace(/_/g, " ");
    return formattedString?.replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
  };

  let subDeatilsList = [
    { key: "Genres", values: details?.genres, renderCloudChip: true },
    {
      key: "Season",
      values: formatString(details?.season) + " " + details?.seasonYear,
      renderCloudChip: false,
    },
    { key: "English", values: details?.title.english, renderCloudChip: false },
    { key: "Native", values: details?.title.native, renderCloudChip: false },
    {
      key: "Source",
      values: formatString(details?.source),
      renderCloudChip: false,
    },
    {
      key: "Studio",
      values: getStudioNames(details?.studios),
      renderCloudChip: true,
    },
  ];

  return (
    <div className="space-y-5 md:pr-5">
      <div className="space-y-3 text-center md:text-left">
        {isLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <h1 className=" text-3xl text-my-white-100 leading-none">
            {details?.title.userPreferred}
          </h1>
        )}
        <div>
          {isLoading ? (
            <Skeleton className="h-5 w-2/3" />
          ) : (
            <MetaData items={metaItems} />
          )}
        </div>
        {isLoading ? (
          <Skeleton className="h-10 w-1/3" />
        ) : (
          <Button primary={true}>ADD TO WATCHLIST</Button>
        )}
      </div>
      <div className="">
        {isLoading ? (
          <div className=" space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ) : (
          <p
            className=" text-my-white-200 text-sm leading-normal font-extralight"
            dangerouslySetInnerHTML={{ __html: details?.description }}
          ></p>
        )}
      </div>
      <div>
        <SubDetails subDeatilsList={subDeatilsList} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default MovieDetails;
