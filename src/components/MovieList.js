export default class MovieList {
  constructor(container) {
    this.container = container;
  }

  render(movies) {
    const movieHTML = movies
      .map((movie) => {
        const { id, title, release_date, vote_average, poster_path } = movie;

        return `
            <div class="movie">
                <img src=https://image.tmdb.org/t/p/w300/${poster_path}/>
                <h2>${title}</h2>
                <p>Release Date: ${release_date}</p>
                <p>Rating: ${Math.round(vote_average)}</p>
                <p>Rating: ${vote_average}</p>
            </div>
        `;
      })
      .join("");

    this.container.innerHTML = movieHTML;
  }

  renderError() {
    this.container.innerHTML = "<p>영화 정보를 불러오는 데 실패했습니다.</p>";
  }
}
