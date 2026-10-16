"use server";

import prismadb from "@/lib/prismadb";
import { phoneNumberSchema } from "@/lib/validation/auth";

export const sendVerifyCode = async (values) => {
  const validateData = phoneNumberSchema.safeParse(values);

  if (!validateData.success) {
    return {
      ok: false,
      status: 400,
      message: "فرمت دیتای ارسالی صحیح نمیباشد",
      errors: validateData.error.flatten().fieldErrors,
    };
  }

  const { phoneNumber, fullName } = values;

  const user = await prismadb.user.upsert({
    where: {
      phoneNumber,
    },
    create: { phoneNumber, fullName },
    update: {},
  });

  console.log("user", user);
};
