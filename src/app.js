import Header from "./components/Header.js";
import MovieList from "./components/MovieList.js";
import Footer from "./components/Footer.js";

class App {
  constructor() {
    this.header = new Header(document.getElementById("header-container"));
    this.footer = new Footer(document.getElementById("footer-container"));

    this.initializeApp();
  }

  initializeApp() {
    this.header.render();
    this.footer.render();
  }
}

new App();
