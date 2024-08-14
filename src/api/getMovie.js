import { tmdbApi } from "./instance";

export function getPopularMovies(page = 1) {
  return tmdbApi.get("/movie/popular", { params: { page } });
}

export function getNowPlayingMovies(page = 1) {
  return tmdbApi.get("/movie/now_playing", { params: { page } });
}

export function getTopRatedMovies(page = 1) {
  return tmdbApi.get("/movie/top_rated", { params: { page } });
}

export function getUpcomingMovies(page = 1) {
  return tmdbApi.get("/movie/upcoming", { params: { page } });
}

export function getMovieDetails(movieId) {
  return tmdbApi.get(`/movie/${movieId}`);
}

export function searchMovies(query, page = 1) {
  return tmdbApi.get(`/search/movie`, {
    params: {
      query: query,
      page: page,
    },
  });
}
