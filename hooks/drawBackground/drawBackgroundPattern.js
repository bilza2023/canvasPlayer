// hooks/drawBackgroundPattern.js
import * as PIXI from "pixi.js";
import toPixiColor from "./toPixiColor.js";

//should be Enum
export function drawBackgroundPattern(pattern, container, width, height) {
  if (!pattern) return;

  switch (pattern.type) {
    case "dots": return drawDotsPattern(pattern.props, container, width, height);
    case "grid": return drawGridPattern(pattern.props, container, width, height);
    case "stripes": return drawStripesPattern(pattern.props, container, width, height);
    case "waves": return drawWavesPattern(pattern.props, container, width, height);
    case "crosshatch": return drawCrosshatchPattern(pattern.props, container, width, height);
    case "bricks": return drawBricksPattern(pattern.props, container, width, height);
    case "mosaic": return drawMosaicPattern(pattern.props, container, width, height);
    case "hexagons": return drawHexagonPattern(pattern.props, container, width, height);
    case "tiles": return drawTilePattern(pattern.props, container, width, height);
      // Unknown pattern — do nothing
      break;
  }
}

function drawDotsPattern(props = {}, container, width, height) {
  const {
    color = "#ffffff",
    opacity = 0.2,
    spacing = 30,
    radius = 2
  } = props;

  const dotColor = toPixiColor(color);
  const g = new PIXI.Graphics();
  g.beginFill(dotColor, opacity);

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      g.drawCircle(x, y, radius);
    }
  }

  g.endFill();
  container.addChild(g);
}

function drawGridPattern(props = {}, container, width, height) {
  const {
    color = "#ffffff",
    opacity = 0.15,
    spacing = 40,
    lineWidth = 1
  } = props;

  const gridColor = toPixiColor(color);
  const g = new PIXI.Graphics();
  g.lineStyle(lineWidth, gridColor, opacity);

  for (let x = 0; x <= width; x += spacing) {
    g.moveTo(x, 0);
    g.lineTo(x, height);
  }

  for (let y = 0; y <= height; y += spacing) {
    g.moveTo(0, y);
    g.lineTo(width, y);
  }

  container.addChild(g);
}

function drawStripesPattern(props = {}, container, width, height) {
  const {
    color = "#ffffff",
    opacity = 0.05,
    thickness = 10,
    gap = 20
  } = props;

  const stripeColor = toPixiColor(color);
  const g = new PIXI.Graphics();
  g.beginFill(stripeColor, opacity);

  for (let y = 0; y < height; y += thickness + gap) {
    g.drawRect(0, y, width, thickness);
  }

  g.endFill();
  container.addChild(g);
}

function drawWavesPattern(props = {}, container, width, height) {
    const {
      color = "#ffffff",
      opacity = 0.08,
      amplitude = 10,
      frequency = 0.05,
      thickness = 2,
      gap = 50
    } = props;
  
    const waveColor = toPixiColor(color);
    const g = new PIXI.Graphics();
    g.lineStyle(thickness, waveColor, opacity);
  
    for (let yOffset = 0; yOffset < height; yOffset += gap) {
      g.moveTo(0, yOffset);
      for (let x = 0; x <= width; x++) {
        const y = amplitude * Math.sin(frequency * x) + yOffset;
        g.lineTo(x, y);
      }
    }
  
    container.addChild(g);
}
  

function drawCrosshatchPattern(props = {}, container, width, height) {
    const { color = "#ffffff", opacity = 0.1, spacing = 25, lineWidth = 1 } = props;
    const hatchColor = toPixiColor(color);
    const g = new PIXI.Graphics();
    g.lineStyle(lineWidth, hatchColor, opacity);
    // Forward diagonals (/)
    for (let x = -height; x < width; x += spacing) {
      g.moveTo(x, 0);
      g.lineTo(x + height, height);
    }
    // Backward diagonals (\)
    for (let x = 0; x < width + height; x += spacing) {
      g.moveTo(x, 0);
      g.lineTo(x - height, height);
    }
    container.addChild(g);
}
function drawBricksPattern(props = {}, container, width, height) {
    const { color = "#ffffff", opacity = 0.07, brickWidth = 60, brickHeight = 30, gap = 4 } = props;
    const brickColor = toPixiColor(color);
    const g = new PIXI.Graphics();
    g.beginFill(brickColor, opacity);
  
    const stepX = brickWidth + gap;
    const stepY = brickHeight + gap;
  
    for (let y = 0; y < height; y += stepY) {
      const offset = (Math.floor(y / stepY) % 2 === 0) ? 0 : stepX / 2;
      for (let x = -offset; x < width; x += stepX) {
        g.drawRect(x, y, brickWidth, brickHeight);
      }
    }
  
    g.endFill();
    container.addChild(g);
  }
  

  function drawMosaicPattern(props = {}, container, width, height) {
    const { color = "#ffffff", opacity = 0.03, minSize = 30, maxSize = 40, count = 40 } = props;
    const fill = toPixiColor(color);
    const g = new PIXI.Graphics();
    g.beginFill(fill, opacity);
  
    const stepX = width / Math.sqrt(count);
    const stepY = height / Math.sqrt(count);
  
    for (let i = 0; i < count; i++) {
      const baseX = (i % Math.floor(width / stepX)) * stepX;
      const baseY = Math.floor(i / Math.floor(width / stepX)) * stepY;
      const w = minSize + Math.random() * (maxSize - minSize) * 0.2;
      const h = minSize + Math.random() * (maxSize - minSize) * 0.2;
      const x = baseX + Math.random() * (stepX - w);
      const y = baseY + Math.random() * (stepY - h);
      g.drawRect(x, y, w, h);
    }
  
    g.endFill();
    container.addChild(g);
  }
  
  
  function drawHexagonPattern(props = {}, container, width, height) {
    const { color = "#ffffff", opacity = 0.07, radius = 30, gap = 4 } = props;
    const hexColor = toPixiColor(color);
    const g = new PIXI.Graphics();
    g.lineStyle(1, hexColor, opacity);
    const hexHeight = Math.sqrt(3) * radius;
    for (let y = 0, row = 0; y < height + radius; y += hexHeight + gap, row++) {
      const offsetX = row % 2 === 0 ? 0 : radius * 1.5 + gap;
      for (let x = offsetX; x < width + radius; x += radius * 3 + gap) {
        drawHex(g, x, y, radius);
      }
    }
    container.addChild(g);
  }
  
  function drawHex(g, cx, cy, r) {
    g.moveTo(cx + r, cy);
    for (let i = 1; i <= 6; i++) {
      const angle = (Math.PI / 3) * i;
      g.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    }
  }
  
  function drawTilePattern(props = {}, container, width, height) {
    const { color = "#ffffff", opacity = 0.05, size = 50, gap = 5, rotate = false } = props;
    const tileColor = toPixiColor(color);
    const g = new PIXI.Graphics();
    g.beginFill(tileColor, opacity);
    for (let y = 0; y < height; y += size + gap) {
      for (let x = 0; x < width; x += size + gap) {
        if (rotate) {
          g.save();
          g.translate(x + size / 2, y + size / 2);
          g.rotation = Math.PI / 4;
          g.drawRect(-size / 2, -size / 2, size, size);
          g.rotation = 0;
          g.restore();
        } else {
          g.drawRect(x, y, size, size);
        }
      }
    }
    g.endFill();
    container.addChild(g);
  }
  