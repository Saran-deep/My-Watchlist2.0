import React from "react";
import Carousel from "../../../UI/Carousel/Carousel";
import HomeSectionHeading from "../HomeSectionHeading/HomeSectionHeading";
import MovieCard from "../MovieCard/MovieCard";
import Skeleton from "../../../UI/Skeleton/Skeleton";

function MoviesTray(props) {
  const { data, carouselTitle, isLoading } = props;
  return (
    <>
      <RenderCarousel
        data={data}
        carouselTitle={carouselTitle}
        isLoading={isLoading}
      />
    </>
  );
}

export default MoviesTray;

const RenderCarousel = (props) => {
  const { data, carouselTitle, isLoading } = props;

  return (
    <div className="carousel">
      {isLoading ? (
        <Skeleton className="h-8 w-1/4 my-3" />
      ) : (
        <HomeSectionHeading>{carouselTitle}</HomeSectionHeading>
      )}

      <Carousel components={carouselItems(data, isLoading)} />
    </div>
  );
};

const carouselItems = (data, isLoading) => {
  const dummyArray = Array.from(new Array(6));
  return isLoading
    ? dummyArray.map((_, index) => (
        <Skeleton className="w-full !h-[285px]" key={index} />
      ))
    : data?.map((item) => {
        return (
          <MovieCard
            animeId={item.id}
            posterImageSmall={item.coverImage.medium}
            posterImageLarge={item.coverImage.extraLarge}
            desc={item.description}
            title={
              item.title.english ? item.title.english : item.title.userPreferred
            }
            genres={item.genres}
          />
        );
      });
};
