import { z } from "zod";

export const farmerAuthSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "password must be atleast 8 character"),
  address: z.string(),
  contact: z.string(),
  image: z.string().optional(),
  role: z.enum(["ADMIN", "FARMER", "CONSUMER"]),
  farmName: z.string(),
  farmAddress: z.string(),
});
