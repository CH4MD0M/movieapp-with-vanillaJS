import { getMovieDetails } from "../api/getMovie.js";
import "../styles/movieDetail.css";

export default class MovieDetail {
  constructor() {
    this.modal = this.createModal();
    document.body.appendChild(this.modal);
  }

  // modal 생성
  createModal() {
    const modal = document.createElement("div");
    modal.className = "movie-modal";
    modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="modal-body"></div>
    </div>
  `;
    modal.style.display = "none";

    modal
      .querySelector(".close")
      .addEventListener("click", () => this.closeModal());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) this.closeModal();
    });

    return modal;
  }

  // modal 닫기
  closeModal() {
    this.modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  async showMovieDetails(movieId) {
    try {
      const { data } = await getMovieDetails(movieId);
      this.renderMovieDetails(data);
      this.modal.style.display = "block";
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Fetching Error Movie Details:", error);
    }
  }

  renderMovieDetails(movie) {
    const modalBody = this.modal.querySelector(".modal-body");
    modalBody.innerHTML = `
    <div class="banner-wrapper">
        <div class="banner" style="background-image: url(https://image.tmdb.org/t/p/original${
          movie.backdrop_path || movie.poster_path
        })"></div>
    </div>
    <div class="modal-info-container">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }" class="modal-poster">
        <div class="modal-info">
          <h2 class="movie-title">${movie.title}</h2>
          <div class="movie-meta">
            <span class="movie-year">${movie.release_date.split("-")[0]}</span>
            <span class="movie-runtime">${movie.runtime}분</span>
          </div>
          <div class="actions">
            <button class="play-btn">재생</button>
            <button class="wishlist-btn">보관함담기</button>
          </div>
          <p class="movie-overview">${movie.overview}</p>
          <div class="movie-details">
            <span>개봉일: ${movie.release_date}</span>
            <span>별점: ${Math.round(movie.vote_average)}</span>
            <span>장르: ${movie.genres
              .map((genre) => genre.name)
              .join(", ")}</span>
          </div>
        </div>
      </div>
    `;
  }
}
