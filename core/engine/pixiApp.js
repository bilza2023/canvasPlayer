import * as PIXI from 'pixi.js';

function hexToPixiColor(hex) {
  return typeof hex === 'string' ? parseInt(hex.replace('#', ''), 16) : hex;
}

export function pixiApp(backgroundColor, width, height) {
  const bg = hexToPixiColor(backgroundColor);

  const app = new PIXI.Application({
    width,
    height,
    backgroundColor: 0xf7f7f7
  });

  return app;
}
