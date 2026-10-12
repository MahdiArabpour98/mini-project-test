"use server";
import { sendSms } from "@/lib/backend/sms/send-sms";
import { defaultMessages } from "@/lib/default-messages";
import { generateRandomNumber } from "@/lib/generate-random-number";
import prismadb from "@/lib/prismadb";
import { smsSignJwtAccessToken, smsVerifyJwt } from "@/lib/sms-jwt";
import { handleRoleId } from "@/lib/user-features";
import {
  phoneNumberSchema,
  verifyCodeSchema,
} from "@/lib/validations/loginForm";

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
      update: {},
      create: {
        phoneNumber,
        username: phoneNumber,
        userRoles: {
          create: { roleName: "USER", roleId: +handleRoleId("USER") },
        },
      },
    });

    if (user.status !== "ACTIVE") {
      return {
        message: "اکانت کاربری شما غیر فعال میباشد",
        status: 403,
        ok: false,
      };
    }

    const randomNumber = generateRandomNumber(5, "string");

    console.log("user?.fullName", user?.fullName);
    console.log("user?.phoneNumber", user?.phoneNumber);
    console.log("randomNumber", randomNumber);

    const verifyToken = smsSignJwtAccessToken(
      {
        ...values,
        code: randomNumber,
      },
      300,
    );

    // SMS
    var data = {
      mobile: user?.phoneNumber,
      //templateId: "538515",
      templateId: "151988",
      parameters: [{ name: "CODE", value: `${randomNumber}` }],
    };

    var smsRes = {
      ok: false,
    };

    await sendSms(data)
      .then((res) => {
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

    if (!validateData.success) {
      return {
        ok: false,
        status: 400,
        message: "فرمت دیتای ارسالی صحیح نمیباشد",
        errors: validateData.error.flatten().fieldErrors,
      };
    }

    const validateToken = values.token ? smsVerifyJwt(values.token) : null;

    if (!validateToken || validateToken.code !== values.code) {
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
