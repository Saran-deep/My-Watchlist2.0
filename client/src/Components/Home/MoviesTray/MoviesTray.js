import React from "react";
import Carousel from "../../../UI/Carousel/Carousel";
import HomeSectionHeading from "../HomeSectionHeading/HomeSectionHeading";
import MovieCard from "../MovieCard/MovieCard";

function MoviesTray({ data, carouselTitle }) {
  return (
    <>
      <RenderCarousel data={data} carouselTitle={carouselTitle} />
    </>
  );
}

export default MoviesTray;

const RenderCarousel = ({ data, carouselTitle }) => {
  const carouselItems = (data) => {
    return data.map((item) => {
      return (
        <MovieCard
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

  return (
    <div className="carousel">
      <HomeSectionHeading>{carouselTitle}</HomeSectionHeading>
      {/* {console.log(data)} */}
      <Carousel components={carouselItems(data)} />
    </div>
  );
};
