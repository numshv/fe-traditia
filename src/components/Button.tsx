import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const buttonClasses = `
      ${className || ''}
      inline-flex items-center justify-center whitespace-nowrap 
      rounded-md px-4 py-2 
      text-sm font-medium text-white 
      bg-[#4c2e1e] 
      transition-colors 
      hover:bg-[#3a2317] 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c2e1e] focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-50
    `.trim();

    return (
      <button className={buttonClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };