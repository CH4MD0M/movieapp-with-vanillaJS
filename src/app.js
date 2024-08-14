import Header from "./components/Header.js";
import MovieList from "./components/MovieList.js";
import Footer from "./components/Footer.js";
import "./styles/global.css";

class App {
  constructor() {
    this.header = new Header(document.getElementById("header-container"));
    this.movieList = new MovieList(document.getElementById("main-container"));
    this.footer = new Footer(document.getElementById("footer-container"));

    this.initializeApp();
  }

  initializeApp() {
    this.header.render();
    this.footer.render();
    this.movieList.initializeMovieList("nowPlaying");

    this.header.onNavClick = (page) => this.movieList.initializeMovieList(page);
    this.header.onSearch = (query) =>
      this.movieList.initializeMovieSearch(query);
  }
}

new App();
