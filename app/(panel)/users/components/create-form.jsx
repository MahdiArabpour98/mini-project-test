"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { userSchema } from "@/lib/validation/user";
import { createUser, editUser } from "../actions/crud";
import SubmitButton from "@/components/submit-button";

export default function CreateForm({ id, initialData, onComplete }) {
  const defaultValues = initialData ? { ...initialData } : { phoneNumber: "", fullName: null };

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    if (initialData) {
      const res = await editUser(id, values);
      if (res?.ok) {
        toast.add({
          title: res?.message,
        });
        onComplete();
      }
    } else {
      const res = await createUser(values);
      if (res?.ok) {
        toast.add({
          title: res?.message,
        });
        onComplete();
      }
    }
  };

  return (
    <form id="form-rhf-input" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-input-fullName">شماره تماس</FieldLabel>
              <Input
                {...field}
                id="form-rhf-input-fullName"
                aria-invalid={fieldState.invalid}
                placeholder="نام و نام خانوادگی"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-input-phoneNumber">شماره تماس</FieldLabel>
              <Input
                {...field}
                id="form-rhf-input-phoneNumber"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="شماره تماس"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <SubmitButton
          title={initialData ? "ویرایش" : "افزودن"}
          loading={isSubmitting}
          disabled={isSubmitting}
          form="form-rhf-input"
        />
      </FieldGroup>
    </form>
  );
}
