import { z } from "zod";

export const productSchema = z.object({
  productName: z.string(),
  productDescription: z.string().min(5),
  productImage: z.string(),
  productPrice: z.number().positive(),
  productQuantity: z.number().positive(),
  productCategory: z.string(),
});
