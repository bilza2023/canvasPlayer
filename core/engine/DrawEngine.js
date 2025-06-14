
// DrawEngine.js

import * as PIXI from "pixi.js";
import { drawItem } from "../../hooks/drawItem.js";
import { drawBackground } from "../../hooks/drawBackground/drawBackground.js";


export default class DrawEngine {
  constructor(app) {
    this.app = app;
    this.stage = app.stage;
    //this is where new code comes
    this.backgroundLayer = new PIXI.Container();
    this.itemLayer = new PIXI.Container();
    this.stage.addChild(this.backgroundLayer, this.itemLayer);
  }
  drawBackground(background, assets = {}) {
    drawBackground(
      background,
      this.backgroundLayer,
      this.app.screen.width,
      this.app.screen.height,
      assets
    );
  }
  
  draw(slide, currentTime,assets={}) {
    // Step 1: Draw background with access to assets
    this.drawBackground(slide.background,assets);
  
    // Clear previous items
    this.itemLayer.removeChildren();
  
    const items = slide.items ?? [];
  
    for (const item of items) {
      const displayObject = drawItem(item, assets);
      if (displayObject) {
        // ← NEW: apply the animated alpha (default to 1)
        displayObject.alpha = item.alpha ?? 1;
        this.itemLayer.addChild(displayObject);
      }
    }
    
  }
  
}
 