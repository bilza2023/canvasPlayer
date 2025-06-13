
// itemSchemas.js — Zod schema for validated item definitions

import { z } from "zod";

// Shared base fields
const baseItem = {
  x: z.number(),
  y: z.number(),
  rotation: z.number().optional().default(0),
  visible: z.boolean().optional().default(true),
  showAt: z.number().optional().default(0),
};

// Specific item types
export const TextItemSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  width: z.number(),
  fontSize: z.number(),
  fontFamily: z.string(),
  color: z.number(),
  textAlign: z.string(),
  ...baseItem,
});

export const IconItemSchema = z.object({
  type: z.literal("icon"),
  iconName: z.string(),
  width: z.number(),
  color: z.number(),
  fontFamily: z.string(),
  ...baseItem,
});

export const RectItemSchema = z.object({
  type: z.literal("rect"),
  width: z.number(),
  height: z.number(),
  color: z.number(),
  ...baseItem,
});

export const CircleItemSchema = z.object({
  type: z.literal("circle"),
  radius: z.number(),
  color: z.number(),
  ...baseItem,
});

export const TriangleItemSchema = z.object({
  type: z.literal("triangle"),
  size: z.number(),
  color: z.number(),
  ...baseItem,
});

export const ImageItemSchema = z.object({
  type: z.literal("image"),
  src: z.string(),
  width: z.number(),
  height: z.number(),
  ...baseItem,
});

export const RichTextItemSchema = z.object({
  type: z.literal("richText"),
  text: z.string(),
  width: z.number(),
  height: z.number(),
  fontSize: z.number(),
  fontFamily: z.string(),
  color: z.number(),
  textAlign: z.string(),
  lineHeight: z.number(),
  ...baseItem,
});

export const TableItemSchema = z.object({
  type: z.literal("table"),
  width: z.number(),
  height: z.number(),
  rows: z.array(z.any()),
  fontSize: z.number(),
  fontFamily: z.string(),
  textColor: z.string(),
  borderColor: z.string(),
  borderWidth: z.number(),
  padding: z.number(),
  rowHeight: z.number(),
  ...baseItem,
});

export const ArcItemSchema = z.object({
  type: z.literal("arc"),
  radius: z.number(),
  innerRadius: z.number(),
  startAngle: z.number(),
  endAngle: z.number(),
  color: z.number(),
  ...baseItem,
});

// Combined
export const ItemSchema = z.union([
  TextItemSchema,
  IconItemSchema,
  RectItemSchema,
  CircleItemSchema,
  TriangleItemSchema,
  ImageItemSchema,
  RichTextItemSchema,
  TableItemSchema,
  ArcItemSchema
]);
