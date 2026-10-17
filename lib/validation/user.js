import * as z from "zod";

export const userSchema = z.object({
  fullName: z.string().optional().nullable(),
  phoneNumber: z
    .string()
    .trim()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
});
