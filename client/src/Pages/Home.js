import React, { useEffect } from "react";
import HeroSection from "../Components/Home/HeroSection/HeroSection";
import MoviesTray from "../Components/Home/MoviesTray/MoviesTray";
import { useQuery } from "@apollo/client";
import { GET_HOME_DATA } from "../GraphQl/Queries";
import SnackBar from "../UI/SnackBar/SnackBar";

function Home() {
  const {
    loading: loading,
    error: error,
    data: data,
  } = useQuery(GET_HOME_DATA, {
    variables: {
      pageNo: 1,
      itemsPerPage: 30,
    },
  });

  useEffect(() => {
    if (!data) return;
    console.log(data);
  }, [data]);

  return (
    <>
      <HeroSection
        heroData={data?.trendingAnimesPage.trendingAnimes}
        isLoading={loading}
      />
      <MoviesTray
        data={data?.trendingAnimesPage.trendingAnimes.filter(
          (item, index) => index > 0
        )}
        carouselTitle={"Top Airing"}
        key={"Top Airing"}
        isLoading={loading}
      />
      <MoviesTray
        data={data?.upcomingAnimesPage.upcomingAnimes}
        carouselTitle={"Upcoming Animes"}
        key={"Upcoming Animes"}
        isLoading={loading}
      />
    </>
  );
}
export default Home;
