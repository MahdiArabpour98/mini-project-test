import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";

const formSchema = z.object({
  code: z.string().min(5, "کد تایید ۵ رقم میباشد").max(5, "کد تایید ۵ رقم میباشد"),
});

const VerifyCode = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values) => {
    toast.add({ description: "خوش آمدید" });
  };

  return (
    <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="code"
          control={form.control}
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
        <SubmitButton className="mt-3" loading={false}>
          تایید
        </SubmitButton>
      </FieldGroup>
    </form>
  );
};

export default VerifyCode;
