import * as React from "react";
import { Keyboard, Paperclip, Search } from "lucide-react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...props }, ref) => {
    const finalClassName = `
        w-full rounded-full border-2 border-current 
        bg-transparent py-3 pl-12 pr-12 
        text-base placeholder:text-black
        ${className || ''}
    `;

    return (
      <div className="relative w-full bg-[#B9875D]/25 rounded-full ">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Paperclip className="h-5 w-5 " />
        </div>

        <input
          type="text"
          className={finalClassName.trim()}
          ref={ref}
          {...props}
        />

        <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-4">
          <Search className="h-5 w-5 " />
        </button>
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { InputField };