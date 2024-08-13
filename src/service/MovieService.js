import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
} from "../api/getMovie.js";

class MovieService {
  async loadMovies(page) {
    let apiCall;
    switch (page) {
      case "nowPlaying":
        apiCall = getNowPlayingMovies();
        break;
      case "popular":
        apiCall = getPopularMovies();
        break;
      case "topRated":
        apiCall = getTopRatedMovies();
        break;
      case "upcoming":
        apiCall = getUpcomingMovies();
        break;
    }

    try {
      const response = await apiCall;
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }

  async searchMovies(query) {
    if (!query.trim()) {
      return [];
    }

    try {
      const response = await searchMovies(query);
      return response.data.results;
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  }
}

export default new MovieService();
