import gql from "graphql-tag";

export const GET_HOME_DATA = gql`
  query HomeQuery($pageNo: Int, $itemsPerPage: Int) {
    upcomingAnimesPage: Page(page: $pageNo, perPage: $itemsPerPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      upcomingAnimes: media(
        sort: POPULARITY_DESC
        type: ANIME
        status: NOT_YET_RELEASED
        genre_not_in: "hentai"
      ) {
        id
        seasonYear
        title {
          romaji
          english
          native
          userPreferred
        }
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        genres
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
        nextAiringEpisode {
          id
          timeUntilAiring
          episode
        }
        meanScore
        averageScore
        episodes
        format
        description
      }
    }
    trendingAnimesPage: Page(page: $pageNo, perPage: $itemsPerPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      trendingAnimes: media(
        sort: TRENDING_DESC
        type: ANIME
        status: RELEASING
        genre_not_in: "hentai"
      ) {
        id
        seasonYear
        title {
          romaji
          english
          native
          userPreferred
        }
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        genres
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
        nextAiringEpisode {
          id
          timeUntilAiring
          episode
        }
        meanScore
        averageScore
        episodes
        format
        description
      }
    }
  }
`;

export const GET_ANIME = gql`
  query getAnime($id: Int) {
    Media(id: $id) {
      id
      seasonYear
      title {
        romaji
        english
        native
        userPreferred
      }
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      genres
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      nextAiringEpisode {
        id
        timeUntilAiring
        episode
      }
      meanScore
      averageScore
      episodes
      format
      description
      characters(sort: ROLE) {
        edges {
          node {
            name {
              full
            }
            image {
              large
              medium
            }
          }
          voiceActors(language: JAPANESE) {
            id
            name {
              full
            }
            image {
              large
              medium
            }
            languageV2
          }
        }
      }
      duration
      source
      favourites
      season
      meanScore
      averageScore
      studios {
        edges {
          node {
            id
            name
            isAnimationStudio
          }
        }
      }
    }
  }
`;

export const HERO_QUERY = gql`
  query HeroQuery($sort: [MediaSort], $isAdult: Boolean) {
    Page(perPage: 1) {
      media(sort: $sort, isAdult: $isAdult) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        averageScore
      }
    }
  }
`;

export const GET_ANIMES_OF_WATCHLIST = gql`
  query GetAnimeOfWatchlist($ids: [Int!]!) {
    animeDetails: Page(page: 1, perPage: 20) {
      media(id_in: $ids, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          medium
          large
          extraLarge
        }
      }
    }
  }
`;
