import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { verifyCodeSchema } from "@/lib/validation/auth";
import { checkVerifyCode } from "../actions/authentication";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes/routes";

export default function VerifyCode({ userData, handleChangeStep }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const res = await checkVerifyCode({ ...values, token: userData.token, phoneNumber: userData.phoneNumber });

    if (res?.ok) {
      toast.add({
        title: res?.message,
      });

      router.replace(routes.root);
    } else {
      toast.add({
        title: res?.message,
      });
    }
  };

  return (
    <form id="form-rhf-input" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="code"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-input-code">کد تایید</FieldLabel>
              <Input
                {...field}
                id="form-rhf-input-code"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="* * * * *"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <SubmitButton title="تایید" loading={isSubmitting} disabled={isSubmitting} form="form-rhf-input" />

        <Button
          disabled={isSubmitting}
          type="button"
          variant="outline"
          onClick={() => {
            handleChangeStep(1);
          }}
        >
          ویرایش شماره تماس
        </Button>
      </FieldGroup>
    </form>
  );
}
