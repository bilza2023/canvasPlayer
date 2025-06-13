
// __tests__/drawItem.factory.test.js

import { describe, it, expect } from "vitest";
import * as PIXI from "pixi.js";
import { drawItem } from "../hooks/drawItem";

// Import creators from your validated item schema
import {
  createTextItem,
  createIconItem,
  createRectItem,
  createCircleItem,
  createTriangleItem,
  createImageItem,
  createRichTextItem,
  createTableItem,
  createArcItem,
} from "../core/defaultItems";

const cases = [
  ["text", createTextItem],
  ["icon", createIconItem],
  ["rect", createRectItem],
  ["circle", createCircleItem],
  ["triangle", createTriangleItem],
  ["image", createImageItem],
  ["richText", createRichTextItem],
  ["table", createTableItem],
  ["arc", createArcItem],
];

describe("drawItem() factory-based tests", () => {
  it.each(cases)("draws %s item without error", (_, createFn) => {
    const item = createFn();
    const output = drawItem(item);
    expect(output).toBeInstanceOf(PIXI.DisplayObject);
  });
});
