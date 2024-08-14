export default class Footer {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <footer>
          <p>&copy; 2024 TMDB Movie App.</p>
      </footer>
    `;
  }
}
