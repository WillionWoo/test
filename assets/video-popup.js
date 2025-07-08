class VideoPopup extends PopupBase {
  constructor() {
    super();
  }

  connectedCallback() {
    this.watchVideoItem();
  }

  watchVideoItem() {
    const videoItems = document.querySelectorAll('[data-video-popup]');
    videoItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        const data = e.currentTarget.dataset;
        this.open(data);
      });
    });
  }

  open(data) {
    const html = `<div
      class="relative w-full inset-0 cover-bg"
      style="--tingle-padding: 0;--aspect-ratio: 16/9;--aspect-ratio-mb:3/5;--bg:url(${data.poster})"
    >
      ${this.generatePopupContent(data.type, data)}
    </div>`;
    if (!html) return;
    this.initPopup(html);
  }
  generatePopupContent(type, data) {
    if (type === 'video') {
      const isMobile = window.innerWidth < 768;
      const source = (isMobile && data.sourceMobile) || data.source;
      const poster = (isMobile && data.posterMobile) || data.poster;
      return `<video
        class="rounded w-full"
        loop="true"
        playsinline="true"
        autoplay="true"
        controls="true"
        src="${source}"
        poster="${poster}"
      ></video>`;
    } else if (type === 'youtube') {
      return `<iframe
        src="https://www.youtube.com/embed/${data.videoId}?enablejsapi=1&disablekb0&autoplay=1&mute=1&loop=1&controls=1&rel=0&playlist=${data.videoId}&playsinline=1"
        class="js-youtube fs-0 w-full"
        frameborder="0"
        allowfullscreen
      ></iframe>`;
    } else if (type === 'vimeo') {
      return `<iframe
        class="js-vimeo fs-0 w-full"
        src="https://player.vimeo.com/video/${data.videoId}?autoplay=1&muted=1&loop=1&controls=0"
        frameborder="0"
        allowfullscreen
      ></iframe>`;
    }
  }
}
customElements.define('video-popup', VideoPopup);
