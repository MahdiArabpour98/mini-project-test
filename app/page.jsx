import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes/routes";
import Link from "next/link";

export default function HeroPage() {
  return (
    <div className="min-h-screen w-screen p-8">
      <Link href={routes.auth.login}>
        <Button>ورود / ثبت نام</Button>
      </Link>
      <Link href={routes.panel.users}>
        <Button>لیست کاربران</Button>
      </Link>
    </div>
  );
}
