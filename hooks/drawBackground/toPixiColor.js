
export default function toPixiColor(cssHex = "#000000") {
    return parseInt(cssHex.replace("#", ""), 16);
  }
  