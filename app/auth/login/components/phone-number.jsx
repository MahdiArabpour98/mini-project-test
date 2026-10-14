"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import { sendVerifyCode } from "../actions/verify-code";
import { phoneNumberSchema } from "@/lib/validations/auth-schema";

const PhoneNumber = ({ handleChangeStep }) => {
  const form = useForm({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber: "",
      fullName: "",
    },
  });

  // const onSubmit = (values) => {
  //   toast.add({ description: " کد تایید برای شما ارسال شد" });
  //   handleChangeStep(2, values);
  // };

  const onSubmit = async (values) => {
    try {
      const res = await sendVerifyCode(values);

      if (res?.ok) {
        toast.add(res?.message);
        handleChangeStep(2, res.data);
      } else {
        toast.add(res?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.add(" مشکلی پیش آمده است. لطفا مجددا تلاش فرمائید");
    }
  };

  return (
    <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="fullName" className="input-label">
                نام و نام خانوادگی
              </FieldLabel>
              <Input
                {...field}
                id="fullName"
                aria-invalid={fieldState.invalid}
                placeholder="نام و نام خانوادگی"
                autoComplete="fullName"
                className="login-input"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phoneNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phoneNumber" className="input-label">
                شماره تماس
              </FieldLabel>
              <Input
                {...field}
                id="phoneNumber"
                aria-invalid={fieldState.invalid}
                placeholder="۰۹"
                autoComplete="phoneNumber"
                className="login-input"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton className="mt-3" loading={false}>
          ارسال
        </SubmitButton>
      </FieldGroup>
    </form>
  );
};

export default PhoneNumber;
