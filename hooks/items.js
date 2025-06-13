// drawItems.js — PURE RENDER FUNCTIONS
import * as PIXI from 'pixi.js';
import Icons from '../core/engine/Icons.js';
import toPixiColor from './toPixiColor.js';

export function drawText(item = {}) {
  const color = toPixiColor(item.color);
  const fontKey = `Font_${item.fontFamily}_${item.fontSize}`;

  if (!PIXI.BitmapFont.available[fontKey]) {
    PIXI.BitmapFont.from(fontKey, {
      fontFamily: item.fontFamily,
      fontSize: item.fontSize,
      fill: color,
    });
  }

  const text = new PIXI.BitmapText(item.text, {
    fontName: fontKey,
    fontSize: item.fontSize,
    tint: color,
  });

  if (item.textAlign === 'center') {
    text.anchor.set(0.5, 0);
    text.x = item.x + item.width / 2;
  } else if (item.textAlign === 'right') {
    text.anchor.set(1, 0);
    text.x = item.x + item.width;
  } else {
    text.anchor.set(0, 0);
    text.x = item.x;
  }

  text.y = item.y;
  text.rotation = item.rotation;
  text.visible = item.visible;
  return text;
}

export function drawIcon(item = {}) {
  const icon = Icons[item.iconName];
  if (!icon) throw new Error(`Icon "${item.iconName}" not found in Icons`);

  const text = new PIXI.Text(icon, {
    fontSize: item.width,
    fill: item.color,
    fontFamily: item.fontFamily,
  });

  text.x = item.x;
  text.y = item.y;
  text.rotation = item.rotation;
  text.visible = item.visible;
  return text;
}

export function drawRect(item = {}) {
  const rect = new PIXI.Graphics();
  rect.beginFill(item.color);
  rect.drawRect(0, 0, item.width, item.height);
  rect.endFill();
  rect.x = item.x;
  rect.y = item.y;
  rect.rotation = item.rotation;
  rect.visible = item.visible;
  return rect;
}

export function drawCircle(item = {}) {
  const circle = new PIXI.Graphics();
  circle.beginFill(item.color);
  circle.drawCircle(0, 0, item.radius);
  circle.endFill();
  circle.x = item.x;
  circle.y = item.y;
  circle.rotation = item.rotation;
  circle.visible = item.visible;
  return circle;
}

export function drawTriangle(item = {}) {
  const triHeight = item.size * 0.86;
  const triangle = new PIXI.Graphics();
  triangle.beginFill(item.color);
  triangle.moveTo(0, 0);
  triangle.lineTo(item.size, 0);
  triangle.lineTo(item.size / 2, triHeight);
  triangle.lineTo(0, 0);
  triangle.endFill();
  triangle.x = item.x;
  triangle.y = item.y;
  triangle.rotation = item.rotation;
  triangle.visible = item.visible;
  return triangle;
}

export function drawImage(item = {}, assets = {}) {
  const texture = assets[item.src];
  if (!texture) {
    console.warn(`⚠️ Image asset "${item.src}" not found in assets map.`);
    return new PIXI.Sprite(PIXI.Texture.WHITE);
  }
  const sprite = new PIXI.Sprite(texture);
  sprite.x = item.x;
  sprite.y = item.y;
  sprite.width = item.width;
  sprite.height = item.height;
  sprite.rotation = item.rotation;
  sprite.visible = item.visible;
  return sprite;
}

export function drawRichText(item = {}) {
  const color = toPixiColor(item.color);
  const text = new PIXI.Text(item.text, {
    fontFamily: item.fontFamily,
    fontSize: item.fontSize,
    fill: color,
    align: item.textAlign,
    wordWrap: true,
    wordWrapWidth: item.width,
    lineHeight: item.lineHeight * item.fontSize,
  });
  text.x = item.x;
  text.y = item.y;
  text.rotation = item.rotation;
  text.visible = item.visible;
  return text;
}

export function drawTable(item = {}) {
  const rows = item.rows.map(r => Array.isArray(r) ? r : r.cells);
  if (!rows.length) return new PIXI.Container();

  const numRows = rows.length;
  const numCols = rows[0].length;
  const rowHeight = item.rowHeight || item.height / numRows;
  const cellWidth = item.width / numCols;

  const txtCol = toPixiColor(item.textColor);
  const brdCol = toPixiColor(item.borderColor);
  const container = new PIXI.Container();
  container.position.set(item.x, item.y);
  container.visible = item.visible;

  rows.forEach((row, rIdx) => {
    const y = rIdx * rowHeight;
    row.forEach((cellText, cIdx) => {
      const x = cIdx * cellWidth;
      if (item.borderWidth > 0) {
        const rect = new PIXI.Graphics();
        rect.lineStyle(item.borderWidth, brdCol, 1);
        rect.drawRect(x, y, cellWidth, rowHeight);
        container.addChild(rect);
      }
      const textObj = new PIXI.Text(String(cellText), {
        fontFamily: item.fontFamily,
        fontSize: item.fontSize,
        fill: txtCol,
        wordWrap: true,
        wordWrapWidth: cellWidth - 2 * item.padding,
        align: "center"
      });
      textObj.x = x + (cellWidth - textObj.width) / 2;
      textObj.y = y + (rowHeight - textObj.height) / 2;
      container.addChild(textObj);
    });
  });

  return container;
}

export function drawArc(item = {}) {
  const g = new PIXI.Graphics();
  g.beginFill(toPixiColor(item.color));
  const resolution = 50;

  const drawRingSegment = (r1, r2, angleStart, angleEnd) => {
    const angleStep = (angleEnd - angleStart) / resolution;
    g.moveTo(item.x + r1 * Math.cos(angleStart), item.y + r1 * Math.sin(angleStart));
    for (let i = 0; i <= resolution; i++) {
      const a = angleStart + i * angleStep;
      g.lineTo(item.x + r1 * Math.cos(a), item.y + r1 * Math.sin(a));
    }
    for (let i = resolution; i >= 0; i--) {
      const a = angleStart + i * angleStep;
      g.lineTo(item.x + r2 * Math.cos(a), item.y + r2 * Math.sin(a));
    }
  };

  if (item.innerRadius > 0) {
    drawRingSegment(item.radius, item.innerRadius, item.startAngle, item.endAngle);
  } else {
    g.moveTo(item.x, item.y);
    for (let i = 0; i <= resolution; i++) {
      const a = item.startAngle + (i / resolution) * (item.endAngle - item.startAngle);
      g.lineTo(item.x + item.radius * Math.cos(a), item.y + item.radius * Math.sin(a));
    }
    g.lineTo(item.x, item.y);
  }

  g.endFill();
  g.rotation = item.rotation;
  g.visible = item.visible;
  return g;
}
