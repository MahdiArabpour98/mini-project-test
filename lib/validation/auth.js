import * as z from "zod";

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
});

export const verifyCodeSchema = z.object({
  code: z.string().min(5, "کد تایید ۵ رقم میباشد").max(5, "کد تایید ۵ رقم میباشد"),
});
