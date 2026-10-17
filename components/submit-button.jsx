"use client";

import { IconLoader } from "@tabler/icons-react";
import { Button } from "./ui/button";

const SubmitButton = ({ title, disabled, loading, type = "submit", form, ...props }) => {
  return (
    <Button {...props} type={type} disabled={disabled} form={form}>
      <span>{title}</span>

      {loading && <IconLoader className="animate-spin" />}
    </Button>
  );
};

export default SubmitButton;
