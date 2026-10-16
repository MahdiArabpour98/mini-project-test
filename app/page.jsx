import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroPage() {
  return (
    <div className="min-h-screen w-screen p-8">
      <Link href="/auth/login">
        <Button>ورود / ثبت نام</Button>
      </Link>
    </div>
  );
}
