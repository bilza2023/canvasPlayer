export class IntervalTicker {
    constructor() {
      this._time = 0;
      this._playing = false;
      this._last = 0;
    }
  
    play() {
      if (this._playing) return;
      this._playing = true;
      this._last = performance.now();
    }
  
    pause() {
      this._playing = false;
    }
  
    reset() {
      this._time = 0;
      this._last = performance.now();
    }
  
    isPlaying() {
      return this._playing;
    }
  
    getTime() {
      if (this._playing) {
        const now = performance.now();
        const delta = (now - this._last) / 1000;
        this._time += delta;
        this._last = now;
      }
      return this._time;
    }
  }
  