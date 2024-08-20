export default class YouTubePlayer {
  constructor() {
    this.player = null;
  }

  loadYouTubeAPI() {
    return new Promise((resolve) => {
      if (window.YT) {
        resolve();
        return;
      }

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        resolve();
      };
    });
  }

  createPlayer(videoId, elementId) {
    return new Promise((resolve, reject) => {
      this.loadYouTubeAPI()
        .then(() => {
          try {
            this.player = new window.YT.Player(elementId, {
              videoId: videoId,
              events: {
                onReady: () => resolve(this.player),
                onError: (error) => reject(error),
              },
            });
          } catch (error) {
            reject(error);
          }
        })
        .catch(reject);
    });
  }

  destroyPlayer() {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
  }
}
