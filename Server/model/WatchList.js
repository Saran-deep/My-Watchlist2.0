const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchListItemSchema = new Schema({
  nextAiringEpisode: {
    timeUntilAiring: {
      type: Number,
      required: false, // make the field optional
    },
    episode: {
      type: Number,
      required: false, // make the field optional
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
  isAiring: {
    type: Boolean,
    required: true,
  },
});

const watchListSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  watchList: [watchListItemSchema],
});

// const WatchListSchema = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "user",
//   },
//   watchList: [
//     {
//       nextAiringEpisode: {
//         timeUntilAiring: {
//           type: Number,
//           required: true,
//         },
//         episode: {
//           type: Number,
//           required: true,
//         },
//       },
//       animeId: {
//         type: String,
//         required: true,
//       },
//       isAnime: {
//         type: Boolean,
//         required: true,
//       },
//     },
//   ],
// });

module.exports = mongoose.model("WatchList", watchListSchema);
