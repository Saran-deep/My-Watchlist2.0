const express = require("express");
const axios = require("axios");
const {
  ANIME_API_URL,
  ITEMS_PER_PAGE,
  TRENDING_ANIMES_QUERY,
  UPCOMING_ANIMES_QUERY,
  GET_ANIME_QUERY,
} = require("../config/anime-API-config");
const HandleAnilistError = require("../utils/HandleAnilistError");

const router = express.Router();

const axiosInstance = axios.create({
  baseURL: ANIME_API_URL,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.defaults.headers.common["Accept-Encoding"] = "identity";

// https://kitsu.io/api/edge/

router.get("/home", async (req, res) => {
  try {
    const upcomingAnimes = await getUpcomingAnimes();
    const trendingAnimes = await getTrendingAnimes();
    res.status(200).json({
      trendingAnimes: { ...trendingAnimes.data.Page },
      upcomingAnimes: { ...upcomingAnimes.data.Page },
      status: true,
    });
  } catch (err) {
    HandleAnilistError(err, res);
  }
});

router.get("/get-anime/:id", async (req, res) => {
  const animeId = req.params.id;

  if (!animeId)
    return res
      .status(400)
      .json({ message: "Anime Id parameter is required", status: false });

  try {
    const variable = JSON.stringify({
      id: animeId,
    });

    const requestOptions = {
      headers: { "Content-Type": "application/json" },
    };
    const data = {
      query: GET_ANIME_QUERY,
      variables: variable,
    };

    const response = await axiosInstance.post("/", data, requestOptions);

    res.status(200).json({
      message: "Anime fetched sucessfully",
      animeDetails: { ...response.data.data.Media },
      status: true,
    });
  } catch (err) {
    console.log(err);
    HandleAnilistError(err, res);
  }
});

const getTrendingAnimes = async () => {
  const variable = JSON.stringify({
    pageNo: 1,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  try {
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
    };
    const data = {
      query: TRENDING_ANIMES_QUERY,
      variables: variable,
    };
    const response = await axiosInstance.post("/", data, requestOptions);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getUpcomingAnimes = async () => {
  const variable = JSON.stringify({
    pageNo: 1,
    itemsPerPage: ITEMS_PER_PAGE,
  });
  try {
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
    };

    const data = {
      query: UPCOMING_ANIMES_QUERY,
      variables: variable,
    };

    const response = await axiosInstance.post("/", data, requestOptions);

    return response.data;
  } catch (err) {
    throw err;
  }
};

module.exports = router;

// Query to get the voice actors
// {
//   Media(id: 20, type: ANIME) {
//     id
//     title {
//       english
//     }
    // characters(role:MAIN){
    //   edges {
    //     node {
    //       name {
    //         full
    //       }
    //       image {
    //         large
    //         medium
    //       }
    //     }
    //     voiceActors(language:JAPANESE){
    //       id
    //       name {
    //         full
    //       }
    //       image {
    //         large
    //         medium
    //       }
    //     }
    //   }
    // }
//   }
// }
