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
  baseURL: ANIME_API_URL,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";

router.get("/top-airing", async (req, res) => {
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
    res.status(200).json({ ...response.data, success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message, success: false });
  }
});

router.get("/upcoming", async (req, res) => {
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
    res.status(200).json({ ...response.data, success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message, success: false });
  }
});

module.exports = router;
