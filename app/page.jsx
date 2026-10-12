import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="bg-background min container h-screen w-screen p-8">
      <Link href="">
        <Button>ورود / ثبت نام</Button>
      </Link>
      <Card className="mt-4">
        <CardContent>check auth</CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
