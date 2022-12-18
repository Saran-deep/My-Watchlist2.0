import React from "react";
import HeroSection from "../Components/Home/HeroSection/HeroSection";
import MovieCard from "../Components/Home/MovieCard/MovieCard";
import Carousel from "../UI/Carousel/Carousel";
import HomeSectionHeading from "../Components/Home/HomeSectionHeading/HomeSectionHeading";
import NavBar from "../Components/NavBar/NavBar";

function Home() {
  const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 8, 10];

  const popularAnimes = dummyArray.map((item) => <MovieCard />);
  return (
    <>
      <NavBar />
      <HeroSection />
      <div className="carousel">
        <HomeSectionHeading>Popular Animes</HomeSectionHeading>
        <Carousel components={popularAnimes} />
      </div>
    </>
  );
}

export default Home;
