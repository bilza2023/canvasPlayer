import {
  drawText,
  drawIcon,
  drawRect,
  drawCircle,
  drawImage,
  drawTriangle,
  drawRichText,
  drawTable,
  drawArc
} from "./items.js"; // adjust path if needed

  
  
  export function drawItem(item, assets = {}) {
    switch (item.type) {
      case "triangle": return drawTriangle(item);
      case "circle": return drawCircle(item);
      case "rect": return drawRect(item);
      case "text": return drawText(item);
      case "icon": return drawIcon(item);
      case "richText": return drawRichText(item);
      case "image": return drawImage(item, assets); // ✅ Assets here
      case "table": return drawTable(item, assets); // ✅ Assets here
      case "arc": return drawArc(item);
      // add others...
      default:
        console.warn("Unknown item type:", item.type);
        return null;
    }
  }
  