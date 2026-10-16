import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { phoneNumberSchema } from "@/lib/validation/auth";

export default function PhoneNumber({ userData: { phoneNumber, fullName }, handleChangeStep }) {
  const form = useForm({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber,
      fullName,
    },
  });

  function onSubmit(values) {
    handleChangeStep(2, values);
    toast.add({
      title: "کد تایید برای شما ارسال شد.",
    });
  }

  return (
    <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="phoneNumber"
          control={form.control}
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
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-input-fullName">نام و نام خانوادگی</FieldLabel>
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
        <Button type="submit" form="form-rhf-input">
          دریافت کد تایید
        </Button>
      </FieldGroup>
    </form>
  );
}
