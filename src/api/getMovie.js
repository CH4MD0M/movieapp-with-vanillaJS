import { tmdbApi } from "./instance";

export function getPopularMovies() {
  return tmdbApi.get("/movie/popular");
}

export function getNowPlayingMovies() {
  return tmdbApi.get("/movie/now_playing");
}

export function getTopRatedMovies() {
  return tmdbApi.get("/movie/top_rated");
}

export function getUpcomingMovies() {
  return tmdbApi.get("/movie/upcoming");
}

export function getMovieDetails(movieId) {
  return tmdbApi.get(`/movie/${movieId}`);
}

export function searchMovies(query) {
  return tmdbApi.get("/search/movie", {
    params: {
      query: query,
    },
  });
}
