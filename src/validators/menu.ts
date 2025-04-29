import { z } from "zod";

export const menuItemSchema = z.object({
  name: z.string(),
  category: z.string().optional(),
  price: z.number().positive(),
  extras: z.array(z.string()).optional(),
  variants: z
    .array(
      z.object({
        size: z.string(),
        price: z.number().positive(),
      })
    )
    .optional(),
});
