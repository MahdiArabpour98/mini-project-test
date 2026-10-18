"use client";

import { useRef } from "react";
import qs from "query-string";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchTable({ q = "" }) {
  const searchParams = useSearchParams();

  const router = useRouter();

  const timerRef = useRef(null);

  const form = useForm({
    defaultValues: { q },
    mode: "onChange",
  });

  const { control } = form;

  const pushQuery = (q = "") => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      page: 1,
      q: q || null,
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

  const handleonChange = async (q) => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      pushQuery(q);
    }, 1500);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FieldGroup>
        <Controller
          name="q"
          control={control}
          render={({ field }) => (
            <Field>
              <Input
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleonChange(e.target.value);
                }}
                className="max-w-96"
                placeholder="جستجو..."
              />
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
