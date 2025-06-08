// runAnimations.js
// Consumes item.animations specs at runtime and mutates the item fields.
// Designed to be called once per frame per item.

// --- basic easing map ------------------------------------------------------
const easing = {
    linear:  t => t,
    easeOut: t => 1 - (1 - t) * (1 - t),       // quadratic ease‑out
    easeIn:  t => t * t,                        // quadratic ease‑in
    easeInOut: t => t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2,
  };
  
  /**
   * Update a single item in place based on its animation specs.
   *
   * @param {object} item        – item with an `animations` array (may be undefined)
   * @param {number} currentTime – current timeline time in seconds
   */
  export function runAnimations(item, currentTime) {
    if (!item.animations || item.animations.length === 0) return;
  
    item.animations.forEach(spec => {
      if (spec.type === "tween") {
        const { field, from, to, start, end, easing: name = "linear" } = spec;
        const easeFn = easing[name] || easing.linear;
  
        if (currentTime < start) {
          item[field] = from;
        } else if (currentTime >= end) {
          item[field] = to;
        } else {
          const k = (currentTime - start) / (end - start);
          item[field] = from + (to - from) * easeFn(k);
        }
      }
  
      if (spec.type === "set") {
        const { field, value, time } = spec;
        if (currentTime >= time) {
          item[field] = value;
        }
      }
    });
  }
  