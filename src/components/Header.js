export default class Header {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <nav>
        <button data-page="nowPlaying">현재 상영작</button>
        <button data-page="popular">인기 영화</button>
        <button data-page="topRated">최고 평점</button>
        <button data-page="upcoming">개봉 예정작</button>
      </nav>
      <div class="search-container">
        <input type="text" id="search-input" placeholder="영화 검색...">
        <button id="search-button">검색</button>
      </div>
    `;
  }
}
