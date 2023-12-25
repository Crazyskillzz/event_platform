import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 characters")
    .max(400, "Description must contain less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must contain at least 3 characters")
    .max(400, "Location must contain less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
