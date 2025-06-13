// __tests__/validateTextItem.schema.test.js

import { describe, it, expect } from "vitest";
import { TextItemSchema } from "../core/itemSchemas.js";  // ✅ Corrected path

const validItem = {
  type: "text",
  text: "Hello",
  x: 0,
  y: 0,
  width: 500,
  fontSize: 36,
  fontFamily: "Arial",
  color: 0x000000,
  textAlign: "left",
  rotation: 0,
  visible: true,
  showAt: 0,
};

const invalidItem = {
  type: "text",
  text: 12345, // ❌ not a string
  x: 0,
  y: 0,
  width: 500,
  fontSize: 36,
  fontFamily: "Arial",
  color: 0x000000,
  textAlign: "left",
  rotation: 0,
  visible: true,
  showAt: 0,
};

describe("TextItemSchema", () => {
  it("validates correct input", () => {
    const parsed = TextItemSchema.parse(validItem);
    expect(parsed).toBeDefined();
    expect(parsed.text).toBe("Hello");
  });

  it("throws error for incorrect input", () => {
    expect(() => TextItemSchema.parse(invalidItem)).toThrow();
  });
});
