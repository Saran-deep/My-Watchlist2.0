const ANIME_API_URL = "https://graphql.anilist.co";
const TIMEOUT_SEC = 10;
const ITEMS_PER_PAGE = 15;

const attributes = ` 
  id,
  seasonYear,
  title {
    romaji
    english
    native
    userPreferred
  }
  status,
  startDate {
    year
    month
    day
  },
  endDate {
    year
    month
    day
  },
  genres,
  coverImage {
    extraLarge
    large
    medium
    color
  },
  bannerImage,
  nextAiringEpisode {
    id,
    timeUntilAiring,
    episode
  },
  meanScore,
  averageScore,
  episodes,
  format,
  description,
`;

const TOP_AIRINGS_ANIME_QUERY = `query($year:Int, $pageNo:Int, $itemsPerPage:Int){
    Page(page:$pageNo, perPage:$itemsPerPage){
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(seasonYear:$year,status:RELEASING,sort:POPULARITY_DESC, genre_not_in:"hentai"){
        ${attributes}
      }
    }
  }`;

const UPCOMING_ANIMES_QUERY = `query ($year: Int,$pageNo:Int,$itemsPerPage:Int) {
    Page(page: $pageNo, perPage:$itemsPerPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(seasonYear:$year,status:NOT_YET_RELEASED,sort:POPULARITY_DESC, genre_not_in:"hentai"){
        ${attributes}
      }
    }
  }
  `;

module.exports = {
  UPCOMING_ANIMES_QUERY,
  TOP_AIRINGS_ANIME_QUERY,
  ITEMS_PER_PAGE,
  TIMEOUT_SEC,
  ANIME_API_URL,
};

// const fetchPro = uploadData
//   ? fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(uploadData),
//     })
//   : fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query: query,
//         variables: variables,
//       }),
//     });
