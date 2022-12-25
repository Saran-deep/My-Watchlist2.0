import React, { useEffect, useState } from "react";
import HeroSection from "../Components/Home/HeroSection/HeroSection";
import MovieCard from "../Components/Home/MovieCard/MovieCard";
import Carousel from "../UI/Carousel/Carousel";
import HomeSectionHeading from "../Components/Home/HomeSectionHeading/HomeSectionHeading";
import NavBar from "../Components/NavBar/NavBar";
import useFetch from "../Utils/useFetch";

function Home() {
  const [topAiringAnimesData, setTopAiringAnimesData] = useState(null);

  const { response, error, loading } = useFetch({
    url: "/anime/home",
    options: { method: "get" },
  });
  useEffect(() => {
    if (response) {
      const { data } = response;
      // console.log(data.topAiringAnimes.media);
      setTopAiringAnimesData(data.topAiringAnimes.media);
    }
  }, [response]);

  const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 8, 10];

  const popularAnimes = dummyArray.map((item) => <MovieCard />);
  return (
    <>
      <NavBar />
      <HeroSection />
      {!loading && topAiringAnimesData ? (
        renderCarousel({
          carouselTitle: "Top Airing",
          data: topAiringAnimesData,
        })
      ) : (
        <h1 className=" flex justify-center text-center	 text-white">
          Loading Data, Please wait....
        </h1>
      )}
    </>
  );
}
export default Home;

const renderCarousel = ({ data, carouselTitle }) => {
  const CarouselItems = (data) => {
    return data.map((item) => {
      return (
        <MovieCard
          posterImageSmall={item.coverImage.medium}
          posterImageLarge={item.coverImage.extraLarge}
          desc={item.description}
          title={item.title.userPreferred}
          genres={item.genres}
        />
      );
    });
  };

  return (
    <div className="carousel">
      <HomeSectionHeading>{carouselTitle}</HomeSectionHeading>
      <Carousel components={CarouselItems(data)} />
    </div>
  );
};
