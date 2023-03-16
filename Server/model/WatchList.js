const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WatchListSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  watchList: [
    {
      nextAiringEpisode: {
        timeUntilAiring: {
          type: Number,
          required: true,
        },
        episode: {
          type: Number,
          required: true,
        },
      },
      animeId: {
        type: String,
        required: true,
      },
      isAnime: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("WatchList", WatchListSchema);
