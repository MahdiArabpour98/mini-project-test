"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import { verifyCodeSchema } from "@/lib/validations/auth-schema";

const VerifyCode = () => {
  const form = useForm({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = (values) => {
    toast.add({ description: "خوش آمدید" });
  };

  return (
    <form id="form-rhf-input" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="code"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="code" className="input-label">
                کد تایید
              </FieldLabel>
              <Input
                {...field}
                id="code"
                aria-invalid={fieldState.invalid}
                placeholder="کد تایید ۵ رقمی"
                autoComplete="code"
                className="login-input"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton className="mt-3" loading={isSubmitting}>
          تایید
        </SubmitButton>
      </FieldGroup>
    </form>
  );
};

export default VerifyCode;
