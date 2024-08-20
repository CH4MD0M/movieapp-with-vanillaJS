import { tmdbApi } from "./instance";

function getPopularMovies(page = 1) {
  return tmdbApi.get("/movie/popular", { params: { page } });
}

function getNowPlayingMovies(page = 1) {
  return tmdbApi.get("/movie/now_playing", { params: { page } });
}

function getTopRatedMovies(page = 1) {
  return tmdbApi.get("/movie/top_rated", { params: { page } });
}

function getUpcomingMovies(page = 1) {
  return tmdbApi.get("/movie/upcoming", { params: { page } });
}

function getMovieDetails(movieId) {
  return tmdbApi.get(`/movie/${movieId}`);
}

function getMovieVideo(movieId) {
  return tmdbApi.get(`/movie/${movieId}/videos`);
}

function getCredits(movieId) {
  return tmdbApi.get(`/movie/${movieId}/credits`);
}

function getMovieReviews(movieId) {
  return tmdbApi.get(`/movie/${movieId}/reviews`, {
    params: {
      language: "en-US",
    },
  });
}

function searchMovies(query, page = 1) {
  return tmdbApi.get(`/search/movie`, {
    params: {
      query: query,
      page: page,
    },
  });
}

export {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetails,
  getMovieVideo,
  getCredits,
  getMovieReviews,
  searchMovies,
};
