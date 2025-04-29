import { z } from "zod";

export const orderSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email().optional(),
    phone: z.string(),
  }),
  items: z.array(
    z.object({
      item_id: z.string(),
      quantity: z.number().int().positive(),
    })
  ),
});
