import {
  getMovieDetails,
  getMovieReviews,
  getCredits,
  getMovieVideo,
} from "../api/getMovie.js";

import YouTubePlayer from "./YoutubePlayer.js";

// CSS
import "../styles/movieDetail.css";

export default class MovieDetail {
  constructor() {
    this.youtubePlayer = new YouTubePlayer();
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
        <div class="banner-wrapper">
          <div class="banner"></div>
        </div>
        <div class="scrollable-content">
          <div class="modal-info-container">
            <img src="" alt="" class="modal-poster">
            <div class="modal-info">
              <h2 class="movie-title"></h2>
              <div class="movie-meta">
                <span class="movie-year"></span>
                <span class="movie-runtime"></span>
              </div>
              <div class="movie-details"></div>
              <p class="movie-overview"></p>
            </div>
          </div>
        </div>
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
    this.youtubePlayer.destroyPlayer();
    this.modal.style.display = "none";
    document.body.style.overflow = "auto";

    // 동적으로 생성된 모든 콘텐츠 제거
    const scrollableContent = this.modal.querySelector(".scrollable-content");
    const dynamicSections = scrollableContent.querySelectorAll(
      ".credits-section, .video-section, .review-section"
    );
    dynamicSections.forEach((section) => section.remove());
  }

  async fetchMovieData(movieId) {
    try {
      const [movieDetails, videos, credits, reviews] = await Promise.all([
        getMovieDetails(movieId),
        getMovieVideo(movieId),
        getCredits(movieId),
        getMovieReviews(movieId),
      ]);

      return {
        details: movieDetails.data,
        videos: videos.data.results,
        credits: credits.data.cast,
        reviews: reviews.data.results,
      };
    } catch (error) {
      console.error("Error fetching movie data:", error);
      throw error;
    }
  }

  async showMovieDetails(movieId) {
    try {
      const movieData = await this.fetchMovieData(movieId);

      this.renderMovieDetails(movieData);
      this.modal.style.display = "block";
      document.body.style.overflow = "hidden";

      // 스크롤 최상단으로 이동
      this.modal.querySelector(".scrollable-content").scrollTop = 0;
    } catch (error) {
      console.error("Error showing movie details:", error);
    }
  }

  renderMovieDetails(movieData) {
    const { details, videos, credits, reviews } = movieData;
    const modalContent = this.modal.querySelector(".modal-content");
    const banner = modalContent.querySelector(".banner");
    const modalPoster = modalContent.querySelector(".modal-poster");
    const movieTitle = modalContent.querySelector(".movie-title");
    const movieYear = modalContent.querySelector(".movie-year");
    const movieRuntime = modalContent.querySelector(".movie-runtime");
    const movieOverview = modalContent.querySelector(".movie-overview");
    const movieDetails = modalContent.querySelector(".movie-details");

    banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${
      details.backdrop_path || details.poster_path
    })`;
    modalPoster.src = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
    modalPoster.alt = details.title;
    movieTitle.textContent = details.title;
    movieYear.textContent = details.release_date.split("-")[0];
    movieRuntime.textContent = `${details.runtime}분`;
    movieOverview.textContent = details.overview;

    movieDetails.innerHTML = `
      <span>개봉일: ${details.release_date}</span>
      <span>별점: ${Math.round(details.vote_average)}</span>
      <span>장르: ${details.genres.map((genre) => genre.name).join(", ")}</span>
    `;

    this.renderCredits(credits);
    this.renderVideos(videos);
    this.renderReviews(reviews);
  }

  // 배우 정보 렌더
  renderCredits(credits) {
    const creditsContainer = this.modal.querySelector(".scrollable-content");
    const creditsSection = document.createElement("div");
    creditsSection.className = "credits-section";

    if (credits.length > 0) {
      const castMembers = credits.slice(0, Math.min(3, credits.length));

      creditsSection.innerHTML = `
        <h3>주요 출연진</h3>
        <div class="cast-members">
          ${castMembers
            .map(
              (member) => `
            <div class="cast-member">
              ${
                member.profile_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${
                      member.profile_path
                    }" alt=${member.name || member.original_name}/>`
                  : '<div class="no-image"></div>'
              }
              <p>${member.name || member.original_name}</p>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    } else {
      creditsSection.innerHTML = `
        <h3>주요 출연진</h3>
        <p class="no-render">죄송합니다. 현재 사용 가능한 출연진 정보가 없습니다.</p>
      `;
    }

    creditsContainer.appendChild(creditsSection);
  }

  // 예고편 렌더
  renderVideos(videos) {
    const videoContainer = this.modal.querySelector(".scrollable-content");

    const videoSection = document.createElement("div");
    videoSection.className = "video-section";

    if (videos && videos.length > 0) {
      const videoKey = videos[0].key;

      videoSection.innerHTML = `
        <h3>예고편</h3>
        <div id="youtube-player"></div>
      `;

      videoContainer.appendChild(videoSection);

      // youtube 플레이어 초기화
      this.youtubePlayer.createPlayer(videoKey, "youtube-player");
    } else {
      videoSection.innerHTML = `
        <h3>예고편</h3>
        <p class="no-render">죄송합니다. 현재 사용 가능한 예고편이 없습니다.</p>
      `;
      videoContainer.appendChild(videoSection);
    }
  }

  // 리뷰 렌더
  renderReviews(reviews) {
    const reviewContainer = this.modal.querySelector(".scrollable-content");
    const reviewSection = document.createElement("div");
    reviewSection.className = "review-section";

    const reviewsToShow = reviews.slice(0, Math.min(5, reviews.length));

    if (reviews && reviews.length > 0) {
      reviewSection.innerHTML = `
        <h3>리뷰</h3>
        <div class="reviews-list">
          ${reviewsToShow
            .map(
              (review) => `
            <div class="review-item">
              <div class="review-header">
                ${
                  review.author_details.avatar_path
                    ? `<img src="https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}" alt="" alt="${review.author}" class="author-avatar"/>`
                    : '<div class="author-avatar no-avatar"></div>'
                }
                  <span class="author-name">${review.author}</span>
                  ${
                    review.author_details.rating
                      ? `<span class="author-rating">⭐ ${review.author_details.rating}/10</span>`
                      : ""
                  }
              </div>
              <p class="review-content">${this.truncateText(
                review.content,
                200
              )}</p>
              <a href="${
                review.url
              }" target="_blank" class="read-more">전체 리뷰 읽기</a>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    } else {
      reviewSection.innerHTML = `
        <h3>리뷰</h3>
        <p class="no-render">아직 등록된 리뷰가 없습니다.</p>
      `;
    }

    reviewContainer.appendChild(reviewSection);
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  }
}
