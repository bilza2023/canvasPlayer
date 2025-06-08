import toPixiColor from "./toPixiColor.js";

export default function getBackgroundColor(slide) {

  const color = slide?.background?.backgroundColor ?? "#000000";
  return toPixiColor(color);
}
