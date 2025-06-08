// __tests__/drawItem.test.js
import { describe, it, expect } from 'vitest';
import { drawItem } from '../hooks/drawItem.js';

const baseTextItem = {
  type: 'text',
  text: 'Hello World',
  x: 10,
  y: 20,
  fontSize: 24,
  color: '#ff0000',
};

describe('drawItem()', () => {
  it('renders text as PIXI.BitmapText', () => {
    const node = drawItem(baseTextItem);
    expect(node).toBeTruthy();
    expect(node.text).toBe('Hello World');
    expect(node.x).toBe(10);
  });

  it('returns null on unknown type', () => {
    const badItem = { type: 'unknown' };
    const node = drawItem(badItem);
    expect(node).toBe(null);
  });
});
