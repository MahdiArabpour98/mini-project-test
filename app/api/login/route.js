import { signJwtAccessToken } from "@/lib/jwt";
import prismadb from "@/lib/prismadb";
import { smsVerifyJwt } from "@/lib/sms-jwt";
import { verifyCodeSchema } from "@/lib/validations/auth-schema";

export async function POST(request) {
  const body = await request.json();

  const { phoneNumber, code, token } = body;

  const values = { phoneNumber, code, token };

  const validateData = verifyCodeSchema.safeParse(values);

  if (!validateData.success) {
    return new Response(JSON.stringify(null));
  }

  const user = await prismadb.user.findUnique({
    where: { phoneNumber },
  });

  const validateToken = values.token ? smsVerifyJwt(values.token) : null;

  if (!validateToken || validateToken.code !== values.code) {
    return new Response(JSON.stringify(null));
  }

  const { password, ...userWithoutPass } = user;

  const accessToken = signJwtAccessToken(userWithoutPass, "60d");

  const result = {
    ...userWithoutPass,
    accessToken,
  };

  return new Response(JSON.stringify(result));
}
