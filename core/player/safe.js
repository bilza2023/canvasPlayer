
// Player.js
import * as PIXI from "pixi.js";
import toPixiColor from "./toPixiColor.js";
import DrawEngine from "../engine/DrawEngine.js";
import { runAnimations } from "../../hooks/simpleAnim.js";

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
 ////////////////////////////////////////////   
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
      this.resize(); // initial call
    }

    this.slides = deckData;
    this.timeSource = timeSource;
    this.currentIndex = 0;
    this.currentTime = 0;
    this.drawEngine = new DrawEngine(this.app);
    this.setAssets(assets);
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

  play() {
    this.timeSource.play();

    // ✅ Defer loop to allow layout to settle
    requestIdleCallback(() => {
      this.startLoop();
    });
  }

  getCurrentTime() {
    return this.currentTime;
  }

  startLoop() {
    const maxTime = this.slides[this.slides.length - 1].endTime;

    const loop = () => {
      if (!this.timeSource.isPlaying()) return;

      const t = this.timeSource.getTime();
      if (t >= maxTime) {
        this.timeSource.pause(); // stop audio + ticker
        this.setTime(maxTime);   // clamp at end
        return;
      }

      this.setTime(t);
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  reset() {
    this.timeSource.pause?.();  // 1️⃣ stop sound / ticker
    this.timeSource.reset();    // 2️⃣ rewind to 0 without auto-play
    this.setTime(0);            // 3️⃣ render first frame
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
