const express = require("express");
const axios = require("axios");
const {
  ANIME_API_URL,
  ITEMS_PER_PAGE,
  TOP_AIRINGS_ANIME_QUERY,
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
    // const upcomingAnimes = await getUpcomingAnimes();
    const topAiringAnimes = await getTopAiringAnimes();

    console.log(topAiringAnimes);
    res.status(200).json({
      topAiringAnimes: { ...topAiringAnimes.data.Page },
      // topAiringAnimes: topAiringAnimes,

      // upcomingAnimes: { ...upcomingAnimes.data.Page },
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

const getTopAiringAnimes = async () => {
  const variable = JSON.stringify({
    year: 2022,
    pageNo: 1,
    itemsPerPage: ITEMS_PER_PAGE,
  });
  try {
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
    };
    const data = {
      query: TOP_AIRINGS_ANIME_QUERY,
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
    year: 2022,
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
