import MovieService from "../service/MovieService.js";
import MovieDetail from "./MovieDetail.js";
import "../styles/movielist.css";

export default class MovieList {
  constructor(container) {
    this.container = container;
    this.currentPage = 1;
    this.totalPages = 1;
    this.loadFunction = null;
    this.isLoading = false;
    this.movies = [];

    this.movieDetail = new MovieDetail();
    this.setupInfiniteScroll();
  }

  setupInfiniteScroll() {
    this.$target = document.createElement("div");
    this.$target.className = "target";
    this.container.appendChild(this.$target);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        !this.isLoading &&
        this.currentPage < this.totalPages
      ) {
        this.loadMoreMovies();
      }
    }, observerOptions);

    this.observer.observe(this.$target);
  }

  // 영화 리스트
  async initializeMovieList(page) {
    this.currentPage = 1;
    this.movies = [];
    this.loadFunction = () => MovieService.loadMovies(page, this.currentPage);
    await this.loadMoreMovies();
  }

  // (검색)영화 리스트
  async initializeMovieSearch(query) {
    this.currentPage = 1;
    this.movies = [];
    this.loadFunction = () =>
      MovieService.searchMovies(query, this.currentPage);
    await this.loadMoreMovies();
  }

  // 영화데이터 더 불러오기(무한 스크롤)
  async loadMoreMovies() {
    if (this.isLoading || this.currentPage > this.totalPages) return;

    this.isLoading = true;

    try {
      const { results: newMovies, totalPages } = await this.loadFunction();
      this.totalPages = totalPages;

      if (newMovies.length === 0) return;

      this.movies = [...this.movies, ...newMovies];
      this.render();
      this.currentPage++;
    } catch (error) {
      console.error("Error in loadMoreMovies:", error);
      this.renderError();
    } finally {
      this.isLoading = false;
    }
  }

  // 영화 정보 render
  render() {
    const movieHTML = this.movies
      .map((movie) => {
        const { id, title, release_date, vote_average, poster_path } = movie;
        return `
        <div class="movie" data-id="${id}">
          <img src="https://image.tmdb.org/t/p/original/${poster_path}"/>
          <h2>${title}</h2>
          <p>개봉일: ${release_date}</p>
          <p>별점: ${Math.round(vote_average)}</p>
        </div>
      `;
      })
      .join("");

    // 기존 영화 목록을 지우고 새로운 목록을 추가.
    this.container.innerHTML = movieHTML;

    // 영화 카드 클릭 이벤트 리스너 추가
    this.container.querySelectorAll(".movie").forEach((movieElement) => {
      movieElement.addEventListener("click", () => {
        const movieId = movieElement.dataset.id;
        this.movieDetail.showMovieDetails(movieId);
      });
    });

    // target 요소를 다시 추가.
    this.container.appendChild(this.$target);
  }

  renderError() {
    this.container.innerHTML += "<p>영화 정보를 불러오는 데 실패했습니다.</p>";
  }
}
