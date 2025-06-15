export default function toPixiColor(color) {
    if (typeof color === "string" && color.startsWith("#")) {
      const hex = color.slice(1).padStart(6, "0");
      return Number("0x" + hex);
    }
    return color;
  }
  