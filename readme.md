# Taleem Canvas Player — README

> Version: 0.0.3
> Status: Stable & Modular
> Core Components: `Player`, `DrawEngine`, `drawItem`, `defaultItems`, `itemSchemas`

---

## 📦 Purpose

This module renders structured slide-based presentations using PixiJS.
It's optimized for educational visuals, animations, and controlled time-based playback.

Use this as the low-level engine. Do **not** modify it in DeckBuilder — only consume its exported API.

---

## 🧠 Architecture Overview

```text
                 +--------------------------+
                 |     IntervalTicker       |  <-- Drives the time
                 +--------------------------+
                             |
                             v
+------------------+   +---------------------+    +-------------------+
|     Player       |-->|    DrawEngine       |--->| drawItem(item)    |
+------------------+   +---------------------+    +-------------------+
        |
        v
 defaultItems + itemSchemas (Zod)
```

---

## 🚀 Getting Started

```js
import { Player, defaultItems, drawItem, itemSchemas } from "taleem-canvasplayer";
```

You must also initialize a `PIXI.Application` and provide a valid `timeSource`.

---

## 🧩 Player API

### `new Player({ app, slides, timeSource })`

* **`app`**: `PIXI.Application` instance
* **`slides`**: array of `Slide` objects
* **`timeSource`**: object with methods:

  * `.play()`
  * `.pause()`
  * `.reset()`
  * `.getTime()`
  * `.isPlaying()`

### `player.play()`

Begins render loop using `requestAnimationFrame`.
Halts at last slide’s `endTime`.

### `player.setTime(time: number)`

Manually sets current time (in seconds) and re-renders.

### `player.getCurrentTime()`

Returns current playback time (float).

### `player.reset()`

Resets everything: pauses, resets timer, redraws slide 0.

### `player.setAssets(assets)`

Injects external images, icons, etc. into the draw context.

### `player.currentSlide`

Returns the current active `slide` based on internal index.

---

## 🖼 Slide Format

A `slide` must have:

```js
{
  startTime: 0,
  endTime: 5,
  background: { backgroundColor: "#222" },
  items: [ ... ] // from defaultItems
}
```

Each item must contain `showAt` relative to `slide.startTime`.
Items are filtered per frame.

---

## 🧱 Items

Use from `defaultItems.js`. Each factory gives you one object:

* `createTextItem(props)`
* `createImageItem(props)`
* `createCircleItem(props)`
* `createArcItem(props)`
* ... and more

Each item must include at least:

```js
{
  type: 'text',
  x, y,
  visible: true,
  showAt: 0,
  // plus other required props (e.g., text, width, etc)
}
```

---

## 🔍 Validation

Use `itemSchemas` to validate your data using [Zod](https://zod.dev):

```js
import { TextItemSchema } from "taleem-canvasplayer";
TextItemSchema.parse(item); // throws if invalid
```

---

## 🧪 Tests

Test files:

* `drawItem.factory.test.js`
* `validateTextItem.schema.test.js`

To run:

```bash
npm run test
```

---

## 🛠️ Future Extensions

* Add `zIndex` to support layer ordering
* Add `exitAt` to remove items before slide ends
* Expand schema coverage for nested/grouped items

---

## 🤝 Integration

This package is consumed by **DeckBuilder** and **Editor UI**.
It should remain clean, dumb, and data-driven.

**Do not embed logic here** related to syllabus, UI templates, or slide editing.

---

## 🧼 License & Ownership

© taleem.help
All rights reserved for internal academic content rendering.
This module is not public-facing.
