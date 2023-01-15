const ANIME_API_URL = "https://graphql.anilist.co";
const TIMEOUT_SEC = 10;
const ITEMS_PER_PAGE = 30;

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

const TRENDING_ANIMES_QUERY = `query($pageNo:Int, $itemsPerPage:Int){
    Page(page:$pageNo, perPage:$itemsPerPage){
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort:TRENDING_DESC, type:ANIME, genre_not_in:"hentai"){
        ${attributes}
      }
    }
  }`;

const UPCOMING_ANIMES_QUERY = `query ($pageNo:Int,$itemsPerPage:Int) {
    Page(page: $pageNo, perPage:$itemsPerPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort:POPULARITY_DESC, type:ANIME, status:NOT_YET_RELEASED, genre_not_in:"hentai"){
        ${attributes}
      }
    }
  }
  `;

module.exports = {
  UPCOMING_ANIMES_QUERY,
  TRENDING_ANIMES_QUERY,
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
