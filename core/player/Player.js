
// Player.js
import * as PIXI from           "pixi.js";
import { Howl } from            "howler";
import toPixiColor from         "./toPixiColor.js";
import DrawEngine from          "../engine/DrawEngine.js";
import IntervalTicker from      "../ticker/IntervalTicker.js";
import { runAnimations } from   "../../hooks/simpleAnim.js";

export class Player {
  constructor({
    mountEl,
    deckData,
    width = 1020,
    height = 576,
    backgroundColor = "#000",
    sound = null,
    assets = {},
    autoResize = true
  }) {
    this.app = new PIXI.Application({
      width,
      height,
      backgroundColor: toPixiColor(backgroundColor),
      antialias: true,
      resolution: window.devicePixelRatio,
      autoDensity: true
    });

    mountEl.appendChild(this.app.view);
    this.mountEl = mountEl;
    this.autoResize = autoResize;

    if (this.autoResize) {
      window.addEventListener("resize", () => this.resize());
      this.resize();
    }

    this.slides = deckData;
    this.currentIndex = 0;
    this.currentTime = 0;
    this.drawEngine = new DrawEngine(this.app);
    this.setAssets(assets);

    if (sound instanceof Howl) {
      this.sound = sound;
      this.getTime = () => sound.seek();
      this.play = () => {
        sound.play();
        this.startLoop();  // ✅ start rendering loop
      };
      this.pause = () => sound.pause();
      this.isPlaying = () => sound.playing();
    } else {
      const ticker = new IntervalTicker();
      this.getTime = () => ticker.getTime();
      this.play = () => {
        ticker.play();
        this.startLoop();  // ✅ start rendering loop
      };
      this.pause = () => ticker.pause();
      this.isPlaying = () => ticker.isPlaying();
    }
    
  }

  resize() {
    const parent = this.mountEl;
    if (!parent) return;

    const scaleX = parent.clientWidth / this.app.screen.width;
    const scaleY = (parent.clientHeight * 0.9) / this.app.screen.height;
    const scale = Math.min(scaleX, scaleY);

    const width = this.app.screen.width;
    const height = this.app.screen.height;

    this.app.view.style.width = `${width * scale}px`;
    this.app.view.style.height = `${height * scale}px`;
    this.app.view.style.display = "block";
    this.app.view.style.margin = "0 auto";
  }

  setAssets(assets = {}) {
    this.assets = {};
    for (const [key, url] of Object.entries(assets)) {
      this.assets[key] = PIXI.Texture.from(url);
    }
  }

  setTime(time) {
    this.currentTime = time;
    this.updateIndexByTime(time);
    this.renderCurrentSlide();
  }

  getCurrentTime() {
    return this.currentTime;
  }

  renderCurrentSlide() {
    const slide = this.currentSlide;

    const visibleItems = (slide.items ?? []).filter(item => {
      return typeof item.showAt === "number" && item.showAt <= this.currentTime;
    });

    visibleItems.forEach(item =>
      runAnimations(item, this.currentTime)
    );

    const visibleSlide = {
      ...slide,
      items: visibleItems
    };

    this.drawEngine.draw(visibleSlide, this.currentTime, this.assets);
  }

  startLoop() {
    const maxTime = this.slides[this.slides.length - 1].endTime;

    const loop = () => {
      if (!this.isPlaying()) return;

      const t = this.getTime();
      if (t >= maxTime) {
        this.pause();
        this.setTime(maxTime);
        return;
      }

      this.setTime(t);
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  reset() {
    this.pause?.();
    if (this.sound instanceof Howl) {
      this.sound.seek(0);
    }
    this.setTime(0);
  }

  updateIndexByTime(time) {
    for (let i = 0; i < this.slides.length; i++) {
      const s = this.slides[i];
      if (time >= s.startTime && time < s.endTime) {
        this.currentIndex = i;
        break;
      }
    }
  }

  get currentSlide() {
    return this.slides[this.currentIndex];
  }
}
