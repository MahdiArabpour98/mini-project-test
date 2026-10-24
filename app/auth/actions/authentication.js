"use server";

import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { phoneNumberSchema, verifyCodeSchema } from "@/lib/validation/auth";

export const sendVerifyCode = async (values) => {
  try {
    const validateData = phoneNumberSchema.safeParse(values);

    if (!validateData.success) {
      return {
        ok: false,
        status: 400,
        message: "فرمت دیتای ارسالی صحیح نمیباشد",
        errors: validateData.error.flatten().fieldErrors,
      };
    }

    const { phoneNumber } = values;

    const user = await prismadb.user.upsert({
      where: { phoneNumber },
      create: { phoneNumber },
      update: {},
    });

    const data = await auth.api.sendPhoneNumberOTP({
      body: { phoneNumber },
    });

    return {
      ok: true,
      data: { ...values },
      message: "کد تایید با موفقیت ارسال شد.",
    };
  } catch (error) {
    console.log("[SEND_VERIFY_CODE_ERROR]", error);

    return {
      message: JSON.stringify({
        message: "Internal error",
        error: error.message,
      }),
      status: 500,
      ok: false,
    };
  }
};

export const checkVerifyCode = async (values) => {
  try {
    const validateData = verifyCodeSchema.safeParse(values);

    if (!validateData.success) {
      return {
        ok: false,
        status: 400,
        message: "فرمت دیتای ارسالی صحیح نمیباشد",
        errors: validateData.error.flatten().fieldErrors,
      };
    }

    const { code, phoneNumber } = values;

    const data = await auth.api.verifyPhoneNumber({
      body: {
        phoneNumber,
        code,
        disableSession: false,
        updatePhoneNumber: false,
      },
    });

    console.log("data", data);

    return {
      ok: true,
      data,
      message: "شماره موبایل با موفقیت تأیید شد.",
    };
  } catch (error) {
    console.log("[CHECK_VERIFY_CODE_ERROR]", error.message);

    return {
      message: JSON.stringify({
        message: "Internal error",
        error: error.message,
      }),
      status: 500,
      ok: false,
    };
  }
};
