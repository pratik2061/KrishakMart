import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(1),
  productDescription: z.string().min(1),
  productCategory: z.string().min(1),
  productPrice: z.coerce.number().positive(),
  productQuantity: z.coerce.number().int().nonnegative(),
});
