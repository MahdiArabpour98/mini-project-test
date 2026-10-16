"use server";

import { generateRandomNumber } from "@/lib/generate-random-number";
import { handleSendSMS } from "@/lib/handle-send-sms";
import { signJWTAccessToken, verifyJWT } from "@/lib/jwt";
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

    const { phoneNumber, fullName } = values;

    const user = await prismadb.user.upsert({
      where: {
        phoneNumber,
      },
      create: { phoneNumber, fullName },
      update: {},
    });

    const randomNumber = generateRandomNumber(5, "string");

    console.log("randomNumber", randomNumber);

    const verifyToken = signJWTAccessToken({ ...values, code: randomNumber }, 600);

    const smsInitialData = {
      mobile: phoneNumber,
      templateId: "151988",
      parameters: [
        {
          name: "CODE",
          value: randomNumber,
        },
      ],
    };

    var smsRes = {
      ok: false,
    };

    await handleSendSMS(smsInitialData)
      .then((res) => {
        console.log("sms-res", res);
        if (res?.data?.status === 1) {
          smsRes = {
            message: "کد تایید برای شما ارسال شد",
            status: 200,
            data: {
              ...values,
              token: verifyToken,
            },
            ok: true,
          };
        } else {
          smsRes = {
            message: defaultMessages?.errors?.internalError,
            status: 400,
            ok: false,
          };
        }
      })
      .catch(() => {
        smsRes = {
          message: defaultMessages?.errors?.internalError,
          status: 400,
          ok: false,
        };
      });

    return smsRes;
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
    console.log("values", values);

    if (!validateData.success) {
      return {
        ok: false,
        status: 400,
        message: "فرمت دیتای ارسالی صحیح نمیباشد",
        errors: validateData.error.flatten().fieldErrors,
      };
    }

    const validateToken = values?.token ? verifyJWT(values?.token) : null;

    // console.log("validateToken", validateToken);

    if (!validateToken || validateToken?.code !== values?.code || validateToken?.phoneNumber !== values?.phoneNumber) {
      return {
        message: "کد تایید وارد شده صحیح نمیباشد",
        status: 400,
        ok: false,
      };
    }

    return {
      message: "خوش آمدید",
      status: 200,
      ok: true,
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
