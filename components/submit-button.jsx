import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconLoader } from "@tabler/icons-react";

const SubmitButton = ({ children, loading, className, ...props }) => {
  return (
    <Button {...props} className={cn("relative", className)} type="submit" disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {children}
        {loading && <IconLoader size={16} className="animate-spin" />}
      </span>
    </Button>
  );
};

export default SubmitButton;
