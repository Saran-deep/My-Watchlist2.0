import React, { useEffect, useState } from "react";
import HeroSection from "../Components/Home/HeroSection/HeroSection";
import MovieCard from "../Components/Home/MovieCard/MovieCard";
import Carousel from "../UI/Carousel/Carousel";
import HomeSectionHeading from "../Components/Home/HomeSectionHeading/HomeSectionHeading";
import NavBar from "../Components/NavBar/NavBar";
import useFetch from "../Utils/useFetch";
import MoviesTray from "../Components/Home/MoviesTray/MoviesTray";

function Home() {
  const [trendingAnimesData, setTrendingAnimesData] = useState(null);
  const [upComingAnimesData, setUpcomingAnimesData] = useState(null);

  const { response, error, loading } = useFetch({
    url: "/anime/home",
    options: { method: "get" },
  });
  useEffect(() => {
    if (response) {
      const { data } = response;

      setTrendingAnimesData(data.trendingAnimes.media);
      setUpcomingAnimesData(data.upcomingAnimes.media);
    }
  }, [response]);

  return (
    <>
      <HeroSection />
      {!loading && upComingAnimesData ? (
        <>
          <MoviesTray
            data={trendingAnimesData}
            carouselTitle={"Top Airing"}
            key={"Top Airing"}
          />
          <MoviesTray
            data={upComingAnimesData}
            carouselTitle={"Upcoming Animes"}
            key={"Upcoming Animes"}
          />
        </>
      ) : (
        <h1 className=" flex justify-center text-center	 text-white">
          Loading Data, Please wait....
        </h1>
      )}
    </>
  );
}
export default Home;
