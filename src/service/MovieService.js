import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
} from "../api/getMovie.js";

class MovieService {
  async loadMovies(page, pageNumber = 1) {
    let apiCall;
    switch (page) {
      case "nowPlaying":
        apiCall = getNowPlayingMovies(pageNumber);
        break;
      case "popular":
        apiCall = getPopularMovies(pageNumber);
        break;
      case "topRated":
        apiCall = getTopRatedMovies(pageNumber);
        break;
      case "upcoming":
        apiCall = getUpcomingMovies(pageNumber);
        break;
    }

    try {
      const response = await apiCall;
      return {
        results: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }

  async searchMovies(query, pageNumber = 1) {
    if (!query.trim()) {
      return { results: [], totalPages: 0 };
    }

    try {
      const response = await searchMovies(query, pageNumber);
      return {
        results: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  }
}

export default new MovieService();
