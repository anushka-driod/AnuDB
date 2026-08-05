import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      icon,
      type = "text",
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div className="input-group">
        <label>{label}</label>

        <div className="input-wrapper">
          <span className="input-icon">{icon}</span>

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;