import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  fullName: z
    .string()
    .min(3, "نام و نام خانوادگی الزامی میباشد و میبایست حداقل ۳ حرف باشد")
    .transform((value) => value.trim())
    .pipe(z.string().min(3, "نام و نام خانوادگی الزامی میباشد و میبایست حداقل ۳ حرف باشد")),
});

const PhoneNumber = ({ handleChangeStep }) => {
  const form = useForm({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber: "",
      fullName: "",
    },
  });

  const onSubmit = (values) => {
    toast.add({ description: " کد تایید برای شما ارسال شد" });
    handleChangeStep(2, values);
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
