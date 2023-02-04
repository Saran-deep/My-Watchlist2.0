import React, { useEffect } from "react";
import HeroSection from "../Components/Home/HeroSection/HeroSection";
import MoviesTray from "../Components/Home/MoviesTray/MoviesTray";
import { useDispatch, useSelector } from "react-redux";
import {
  trendingAnimes,
  upComingAnimes,
  getHomePageContents,
  haveHomeData,
} from "../redux/Features/Home/homeSlice";

function Home() {
  const dispatch = useDispatch();

  const { isLoading, error, status } = useSelector((state) => state.home);
  const trendingAnimesData = useSelector(trendingAnimes);
  const upComingAnimesData = useSelector(upComingAnimes);
  const haveHomedata = useSelector(haveHomeData);

  useEffect(() => {
    if (haveHomedata) return;
    dispatch(getHomePageContents());
  }, []);

  return (
    <>
      <HeroSection />
      <MoviesTray
        data={trendingAnimesData}
        carouselTitle={"Top Airing"}
        key={"Top Airing"}
        isLoading={isLoading}
      />
      <MoviesTray
        data={upComingAnimesData}
        carouselTitle={"Upcoming Animes"}
        key={"Upcoming Animes"}
        isLoading={isLoading}
      />
    </>
  );
}
export default Home;
