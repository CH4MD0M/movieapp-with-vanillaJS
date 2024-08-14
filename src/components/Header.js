export default class Header {
  constructor(container) {
    this.container = container;
    this.onNavClick = null;
    this.onSearch = null;
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

    this.container.querySelectorAll("button[data-page]").forEach((button) => {
      button.addEventListener("click", () => {
        if (this.onNavClick) {
          this.onNavClick(button.dataset.page);
        }
      });
    });

    const searchButton = this.container.querySelector("#search-button");
    const searchInput = this.container.querySelector("#search-input");

    searchButton.addEventListener("click", () => this.handleSearch());
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSearch();
      }
    });
  }

  async handleSearch() {
    const searchInput = this.container.querySelector("#search-input");
    const query = searchInput.value;
    if (query.trim() && this.onSearch) {
      this.onSearch(query);
    }
  }
}
