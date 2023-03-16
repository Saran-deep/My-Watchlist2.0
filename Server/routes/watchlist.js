const express = require("express");
const _ = require("lodash");

const router = express.Router();

const validateToken = require("../middlewares/ValidateToken");

const WatchList = require("../model/WatchList");
const ValidateToken = require("../middlewares/ValidateToken");

router.post("/add-to-watchlist", validateToken, async (req, res) => {
  console.log(req.body);
  const animeId = req.body.animeId;
  const nextAiringEpisode = req.body.nextAiringEpisode;

  if (!animeId)
    return res
      .status(400)
      .json({ message: "animeId is not provided.", status: false });
  if (!nextAiringEpisode)
    return res.status(400).json({
      message: "Next airing shedule is not provided.",
      status: false,
    });

  if (_.isEmpty(nextAiringEpisode))
    return res.status(400).json({
      message: "Next airing shedule is not provided.",
      status: false,
    });

  const userId = req.user.userId;

  try {
    const watchList = await WatchList.findOne({ userId });
    let newWatchList;
    if (!watchList) {
      newWatchList = new WatchList({
        userId,
        watchList: [
          {
            nextAiringEpisode: nextAiringEpisode,
            animeId: animeId,
            isAnime: true,
          },
        ],
      });
      newWatchList = await newWatchList.save();
    } else {
      watchList.watchList.push({
        nextAiringEpisode: nextAiringEpisode,
        animeId: animeId,
        isAnime: true,
      });

      newWatchList = await watchList.save();
    }
    return res.status(200).json({
      message: "Movie added to watchlist",
      status: true,
      watchList: newWatchList.watchList,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: false });
  }
});

router.get("/get-watchlist", ValidateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const watchList = await WatchList.findOne({ userId });

    if (!watchList)
      return res.status(200).json({
        message: "User doesnt have a watchlist",
        status: true,
        watchList: [],
      });

    return res.status(200).json({
      message: "Watchlist fetched successfully",
      status: true,
      watchList: watchList.watchList,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: false });
  }
});

router.delete("/delete-from-watchlist", ValidateToken, async (req, res) => {
  const animeId = req.body.animeId;

  if (!animeId)
    return res
      .status(400)
      .json({ message: "animeId is not provided.", status: false });
  const userId = req.user.userId;

  try {
    const userWatchList = await WatchList.findOne({ userId });
    if (!userWatchList)
      return res.status(404).json({
        message: "No watchlist found for the current user",
        status: false,
      });

    await WatchList.updateMany(
      { userId: userId },
      { $pull: { watchList: { animeId: animeId } } }
    );

    const response = await WatchList.findOne({ userId });

    return res.status(200).json({
      message: "Movie deleted from the watchlist",
      status: true,
      watchList: response.watchList,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: false });
  }
});

module.exports = router;
