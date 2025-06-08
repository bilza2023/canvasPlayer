
import * as PIXI from 'pixi.js';
import Icons from '../core/engine/Icons.js';
import toPixiColor from "./toPixiColor.js";
// === TEXT ===
export function drawText(props = {}) {
  // debugger;
  const merged = {
    text: 'Default Text',
    type: 'text',
    x: 0,
    y: 0,
    width: 1020,              // default to full screen width
    fontSize: 36,
    fontFamily: 'Arial',
    color: 0x000000,
    textAlign: 'left',        // new: honor layout intent
    rotation: 0,
    visible: true,
    ...props,
  };

  // toPixiColor
  merged.color = toPixiColor(merged.color); 
  const fontKey = `Font_${merged.fontFamily}_${merged.fontSize}`;

  if (!PIXI.BitmapFont.available[fontKey]) {
    PIXI.BitmapFont.from(fontKey, {
      fontFamily: merged.fontFamily,
      fontSize: merged.fontSize,
      fill: merged.color,
    });
  }

  const text = new PIXI.BitmapText(merged.text, {
    fontName: fontKey,
    fontSize: merged.fontSize,
    tint: merged.color,
  });

  // === Alignment logic ===
  if (merged.textAlign === 'center') {
    text.anchor.set(0.5, 0);                         // center
    text.x = merged.x + merged.width / 2;
  } else if (merged.textAlign === 'right') {
    text.anchor.set(1, 0);                           // right-align
    text.x = merged.x + merged.width;
  } else {
    text.anchor.set(0, 0);                           // left-align
    text.x = merged.x;
  }

  text.y = merged.y;
  text.rotation = merged.rotation;
  text.visible = merged.visible;
  return text;
}

// === ICON ===
export function drawIcon(props = {}) {
  const merged = {
    iconName: 'BULB',
    type : 'icon',
    x: 0,
    y: 0,
    width: 100,
    color: 0xffffff,
    fontFamily: 'Arial',
    rotation: 0,
    visible: true,
    ...props,
  };

  const icon = Icons[merged.iconName];
  if (!icon) throw new Error(`Icon "${merged.iconName}" not found in Icons`);

  const text = new PIXI.Text(icon, {
    fontSize: merged.width,
    fill: merged.color,
    fontFamily: merged.fontFamily,
  });

  text.x = merged.x;
  text.y = merged.y;
  text.rotation = merged.rotation;
  text.visible = merged.visible;
  return text;
}

// === RECTANGLE ===
export function drawRect(props = {}) {
  const merged = {
    type : 'rect',
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    color: 0x00ccff,
    rotation: 0,
    visible: true,
    ...props,
  };

  const rect = new PIXI.Graphics();
  rect.beginFill(merged.color);
  rect.drawRect(0, 0, merged.width, merged.height);
  rect.endFill();

  rect.x = merged.x;
  rect.y = merged.y;
  rect.rotation = merged.rotation;
  rect.visible = merged.visible;
  return rect;
}

// === CIRCLE ===
export function drawCircle(props = {}) {
  const merged = {
    type : 'circle',
    x: 0,
    y: 0,
    radius: 50,
    color: 0xff6666,
    rotation: 0,
    visible: true,
    ...props,
  };

  const circle = new PIXI.Graphics();
  circle.beginFill(merged.color);
  circle.drawCircle(0, 0, merged.radius);
  circle.endFill();

  circle.x = merged.x;
  circle.y = merged.y;
  circle.rotation = merged.rotation;
  circle.visible = merged.visible;
  return circle;
}

// === TRIANGLE ===
export function drawTriangle(props = {}) {
  const merged = {
    type : 'triangle',
    x: 0,
    y: 0,
    size: 100,
    color: 0x66ff66,
    rotation: 0,
    visible: true,
    ...props,
  };

  const triHeight = merged.size * 0.86;
  const triangle = new PIXI.Graphics();
  triangle.beginFill(merged.color);
  triangle.moveTo(0, 0);
  triangle.lineTo(merged.size, 0);
  triangle.lineTo(merged.size / 2, triHeight);
  triangle.lineTo(0, 0);
  triangle.endFill();

  triangle.x = merged.x;
  triangle.y = merged.y;
  triangle.rotation = merged.rotation;
  triangle.visible = merged.visible;
  return triangle;
}

// === IMAGE ===
export function drawImage(props = {}, assets = {}) {
  
  const merged = {
    type: 'image',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    src: 'book',
    rotation: 0,
    visible: true,
    ...props,
  };

  const texture = assets[merged.src];
  if (!texture) {
    console.warn(`⚠️ Image asset "${merged.src}" not found in assets map.`);
    return new PIXI.Sprite(PIXI.Texture.WHITE); // or return null
  }

  const sprite = new PIXI.Sprite(texture);
  sprite.x = merged.x;
  sprite.y = merged.y;
  sprite.width = merged.width;
  sprite.height = merged.height;
  sprite.rotation = merged.rotation;
  sprite.visible = merged.visible;

  return sprite;
}


export function drawRichText(props = {}) {
  const merged = {
    text: "Default rich text",
    type: "richText",
    x: 0,
    y: 0,
    width: 800,
    height: 200,
    fontSize: 36,
    fontFamily: "Georgia",
    color: 0x000000,
    textAlign: "left",
    lineHeight: 1.5,
    rotation: 0,
    visible: true,
    ...props
  };

  merged.color = toPixiColor(merged.color);

  const text = new PIXI.Text(merged.text, {
    fontFamily: merged.fontFamily,
    fontSize: merged.fontSize,
    fill: merged.color,
    align: merged.textAlign,
    wordWrap: true,
    wordWrapWidth: merged.width,
    lineHeight: merged.lineHeight * merged.fontSize
  });

  text.x = merged.x;
  text.y = merged.y;
  text.rotation = merged.rotation;
  text.visible = merged.visible;

  return text;
}

export function drawTable(props = {}) {
  const merged = {
    type: "table",
    x: 0,
    y: 0,
    width: 800,
    height: 400,

    rows: [],              // array of arrays OR array of {cells:[]}
    fontSize: 28,
    fontFamily: "Arial",

    textColor:  "#ffffff", // visible by default
    borderColor:"#333333",
    borderWidth: 2,

    padding: 10,
    rowHeight: 50,         // fallback – recalculated below if 0
    visible:  true,
    ...props,
  };

  /* ---------- normalise rows ---------- */
  const normalisedRows = merged.rows.map(r => Array.isArray(r) ? r : r.cells);
  if (!normalisedRows.length) return new PIXI.Container();

  const numRows   = normalisedRows.length;
  const numCols   = normalisedRows[0].length;
  const rowHeight = merged.rowHeight || merged.height / numRows;
  const cellWidth = merged.width  / numCols;

  /* ---------- colour conversion ---------- */
  const txtCol  = toPixiColor(merged.textColor);
  const brdCol  = toPixiColor(merged.borderColor);

  /* ---------- container ---------- */
  const container = new PIXI.Container();
  container.position.set(merged.x, merged.y);
  container.visible = merged.visible;

  /* ---------- build cells ---------- */
  normalisedRows.forEach((row, rIdx) => {
    const y = rIdx * rowHeight;

    row.forEach((cellText, cIdx) => {
      const x = cIdx * cellWidth;

      /* border (optional) */
      if (merged.borderWidth > 0) {
        const rect = new PIXI.Graphics();
        rect.lineStyle(merged.borderWidth, brdCol, 1);
        rect.drawRect(x, y, cellWidth, rowHeight);
        container.addChild(rect);
      }

      /* text */
      const textObj = new PIXI.Text(String(cellText), {
        fontFamily : merged.fontFamily,
        fontSize   : merged.fontSize,
        fill       : txtCol,
        wordWrap   : true,
        wordWrapWidth : cellWidth - 2 * merged.padding,
        align      : "center"
      });

      // centre text inside its cell
      textObj.x = x + (cellWidth  - textObj.width ) / 2;
      textObj.y = y + (rowHeight  - textObj.height) / 2;
      container.addChild(textObj);
    });
  });

  return container;
}

// drawArc.js

export function drawArc(props = {}) {
  const merged = {
    type: "arc",
    x: 0,
    y: 0,
    radius: 100,
    innerRadius: 0,
    startAngle: 0,
    endAngle: Math.PI * 2,
    color: 0x00ff00,
    rotation: 0,
    visible: true,
    ...props
  };

  const g = new PIXI.Graphics();
  g.beginFill(toPixiColor(merged.color));

  const resolution = 50; // Higher = smoother

  const drawRingSegment = (r1, r2, angleStart, angleEnd) => {
    const angleStep = (angleEnd - angleStart) / resolution;
    g.moveTo(
      merged.x + r1 * Math.cos(angleStart),
      merged.y + r1 * Math.sin(angleStart)
    );

    for (let i = 0; i <= resolution; i++) {
      const a = angleStart + i * angleStep;
      g.lineTo(
        merged.x + r1 * Math.cos(a),
        merged.y + r1 * Math.sin(a)
      );
    }

    for (let i = resolution; i >= 0; i--) {
      const a = angleStart + i * angleStep;
      g.lineTo(
        merged.x + r2 * Math.cos(a),
        merged.y + r2 * Math.sin(a)
      );
    }
  };

  if (merged.innerRadius > 0) {
    drawRingSegment(merged.radius, merged.innerRadius, merged.startAngle, merged.endAngle);
  } else {
    g.moveTo(merged.x, merged.y);
    for (let i = 0; i <= resolution; i++) {
      const a = merged.startAngle + (i / resolution) * (merged.endAngle - merged.startAngle);
      g.lineTo(
        merged.x + merged.radius * Math.cos(a),
        merged.y + merged.radius * Math.sin(a)
      );
    }
    g.lineTo(merged.x, merged.y); // Close pie
  }

  g.endFill();
  g.rotation = merged.rotation;
  g.visible = merged.visible;
  return g;
}
