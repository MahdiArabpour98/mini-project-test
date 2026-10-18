"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const items = [
  { label: "ادمین", value: "ADMIN" },
  { label: "کاربر", value: "USER" },
];

export default function HandleFilter({ currentRole }) {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pushQuery = (role = null) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      page: 1,
      role,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      },
    );

    router.push(url);
  };

  console.log("currentRole", currentRole);

  return (
    <Select items={items} value={currentRole} onValueChange={(role) => pushQuery(role)}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="سطح دسترسی" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
