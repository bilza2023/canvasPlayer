// createTicker.js
import { Howl } from "howler";
import { HowlerTicker } from "./HowlerTicker.js";
import { IntervalTicker } from "./IntervalTicker.js";

export function createTicker(soundUrl = null) {
  if (soundUrl) {
    const sound = new Howl({
      src: [soundUrl],
      html5: true
    });
    return new HowlerTicker(sound);
  }

  return new IntervalTicker();
}
