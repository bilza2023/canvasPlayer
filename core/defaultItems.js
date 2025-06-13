// items.js — FINAL VERSION WITH showAt INCLUDED

const defaultShowAt = 0;

export function createTextItem(props = {}) {
  return {
    type: 'text',
    text: 'Default Text',
    x: 0,
    y: 0,
    width: 1020,
    fontSize: 36,
    fontFamily: 'Arial',
    color: 0x000000,
    textAlign: 'left',
    rotation: 0,
    visible: true,
    showAt: defaultShowAt,
    ...props,
  };
}

export function createIconItem(props = {}) {
  return {
    type: 'icon',
    iconName: 'BULB',
    x: 0,
    y: 0,
    width: 100,
    color: 0xffffff,
    fontFamily: 'Arial',
    rotation: 0,
    visible: true,
    showAt: defaultShowAt,
    ...props,
  };
}

export function createRectItem(props = {}) {
  return {
    type: 'rect',
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    color: 0x00ccff,
    rotation: 0,
    visible: true,
    showAt: defaultShowAt,
    ...props,
  };
}

export function createCircleItem(props = {}) {
  return {
    type: 'circle',
    x: 0,
    y: 0,
    radius: 50,
    color: 0xff6666,
    rotation: 0,
    visible: true,
    showAt: defaultShowAt,
    ...props,
  };
}

export function createTriangleItem(props = {}) {
  return {
    type: 'triangle',
    x: 0,
    y: 0,
    size: 100,
    color: 0x66ff66,
    rotation: 0,
    visible: true,
    showAt: defaultShowAt,
    ...props,
  };
}

export function createImageItem(props = {}) {
  return {
    type: 'image',
    src: 'book',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    visible: true,
    showAt: defaultShowAt,
    ...props,
  };
}

export function createRichTextItem(props = {}) {
  return {
    type: 'richText',
    text: 'Default rich text',
    x: 0,
    y: 0,
    width: 800,
    height: 200,
    fontSize: 36,
    fontFamily: 'Georgia',
    color: 0x000000,
    textAlign: 'left',
    lineHeight: 1.5,
    rotation: 0,
    visible: true,
    showAt: defaultShowAt,
    ...props,
  };
}

export function createTableItem(props = {}) {
  return {
    type: 'table',
    x: 0,
    y: 0,
    width: 800,
    height: 400,
    rows: [],
    fontSize: 28,
    fontFamily: 'Arial',
    textColor: '#ffffff',
    borderColor: '#333333',
    borderWidth: 2,
    padding: 10,
    rowHeight: 50,
    visible: true,
    showAt: defaultShowAt,
    ...props,
  };
}

export function createArcItem(props = {}) {
  return {
    type: 'arc',
    x: 0,
    y: 0,
    radius: 100,
    innerRadius: 0,
    startAngle: 0,
    endAngle: Math.PI * 2,
    color: 0x00ff00,
    rotation: 0,
    visible: true,
    showAt: defaultShowAt,
    ...props,
  };
}
