import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { routes } from "@/lib/routes/routes";
import { cn } from "cn";
import { headers } from "next/headers";
import Link from "next/link";

export default async function HeroPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("session", session);

  return (
    <div className="min-h-screen w-screen p-8">
      <Link href={routes.auth.login}>
        <Button>ورود / ثبت نام</Button>
      </Link>
      <Link href={routes.panel.users}>
        <Button>لیست کاربران</Button>
      </Link>
      <p className="mt-4">
        وضعیت ورود کاربر :{" "}
        <span className={cn(session ? "text-green-600" : "text-red-600")}>
          {session ? `وارد شده : ${session?.user?.phoneNumber}` : "وارد نشده"}
        </span>
      </p>
    </div>
  );
}
