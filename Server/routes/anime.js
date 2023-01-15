const express = require("express");
const axios = require("axios");
const {
  ANIME_API_URL,
  ITEMS_PER_PAGE,
  TRENDING_ANIMES_QUERY,
  UPCOMING_ANIMES_QUERY,
} = require("../config/anime-API-config");

const router = express.Router();

const axiosInstance = axios.create({
  // baseURL: "https://kitsu.io/api/edge",
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
    res.status(503).json({ message: err.message, status: false });
  }
});

// const getTopAiringAnimes = async () => {
//   try {
//     const response = await axiosInstance.get(
//       "/trending/anime"
//     );
//     return response.data;
//   } catch (err) {
//     throw err;
//   }
// };

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
    console.log(err);
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
