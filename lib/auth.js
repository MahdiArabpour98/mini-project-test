import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { phoneNumber } from "better-auth/plugins";
import prismadb from "./prismadb";
import { handleSendSMS } from "./handle-send-sms";

export const auth = betterAuth({
  database: prismaAdapter(prismadb, {
    provider: "postgresql",
  }),

  plugins: [
    nextCookies(),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, ctx) => {
        console.log("phoneNumber", phoneNumber);
        console.log("code", code);

        const smsInitialData = {
          mobile: phoneNumber,
          templateId: "151988",
          parameters: [{ name: "CODE", value: code }],
        };

        await handleSendSMS(smsInitialData)
          .then((res) => {
            console.log("smsRes", res);
          })
          .catch((err) => {
            console.log("smsError", err);
          });
      },
    }),
  ],

  advanced: {
    database: {
      generateId: "serial",
    },
  },
});
