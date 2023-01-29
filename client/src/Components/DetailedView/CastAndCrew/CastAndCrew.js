import React from "react";
import Image from "../../../UI/Image/Image";
import Skeleton from "../../../UI/Skeleton/Skeleton";

function CastAndCrew(props) {
  const { cast, isLoading } = props;

  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-7 w-1/2 mb-4" />
      ) : (
        <h2 className="text-xl text-my-white-100 mb-4">
          Voice Actors & Characters
        </h2>
      )}

      <ul className="list-none space-y-3">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          cast?.map((item, index) => {
            return (
              <li className="flex items-center gap-x-3" key={index}>
                <div>
                  <Image
                    highQualityImageURL={item.voiceActors[0]?.image.large}
                    lowQualityImageURL={item.voiceActors[0]?.image.medium}
                    alt={"Headshot of " + item.voiceActors[0]?.name.full}
                    className="rounded object-cover h-[75px] w-[60px]"
                  />
                </div>
                <div>
                  <p className=" text-my-white-100 text-base">
                    {item.voiceActors[0]?.name.full}
                  </p>
                  <p className="text-my-white-200 text-xs">
                    as {item.node.name.full}
                  </p>
                </div>
                <div className=" ml-auto pr-2">
                  <Image
                    highQualityImageURL={item.node.image.large}
                    lowQualityImageURL={item.node.image.medium}
                    alt={"Headshot of " + item.node.name.full}
                    className="rounded object-cover h-[75px] w-[60px]"
                  />
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default CastAndCrew;

const LoadingAnimation = () => {
  const dummyArray = Array.from(new Array(3));
  console.log(dummyArray);
  return dummyArray.map((_, index) => {
    console.log("Print ");
    return (
      <li className="flex items-center gap-x-3" key={index}>
        <div>
          <Skeleton className="h-[75px] w-[60px]" />
        </div>
        <div className=" space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-2 w-20" />
        </div>
        <div className=" ml-auto pr-2">
          <Skeleton className="h-[75px] w-[60px]" />
        </div>
      </li>
    );
  });
};
