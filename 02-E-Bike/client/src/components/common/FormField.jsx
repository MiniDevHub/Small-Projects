import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

const FormField = React.forwardRef(
  ({ label, error, required, helperText, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={props.id || props.name}>
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </Label>
        )}
        <Input ref={ref} error={error} {...props} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
