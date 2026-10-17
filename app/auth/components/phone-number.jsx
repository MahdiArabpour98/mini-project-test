import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { phoneNumberSchema } from "@/lib/validation/auth";
import { sendVerifyCode } from "../actions/authentication";
import SubmitButton from "@/components/submit-button";

export default function PhoneNumber({ userData: { phoneNumber }, handleChangeStep }) {
  const form = useForm({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const res = await sendVerifyCode(values);

    console.log("res", res);

    if (res?.ok) {
      toast.add({
        title: res?.message,
      });
    }

    handleChangeStep(2, res?.data);
  };

  return (
    <form id="form-rhf-input" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
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

        <SubmitButton title="دریافت کد تایید" loading={isSubmitting} disabled={isSubmitting} form="form-rhf-input" />
      </FieldGroup>
    </form>
  );
}
