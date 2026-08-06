import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Primary interactive control. Kelder red is reserved for `variant="primary"` —
 * every other variant stays neutral so red keeps meaning "do this now".
 * The canvas for this component is at tempo/designs/design-system/primitives/index.canvas.tsx.
 * If you adjust this component in any way, ensure the canvas and its asset declaration stay consistent.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-kelder-600 text-white hover:bg-kelder-700 active:bg-kelder-800",
  secondary: "bg-ink-100 text-ink-900 hover:bg-ink-200",
  ghost: "bg-transparent text-ink-700 hover:bg-ink-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-12 px-5 text-base",
  sm: "h-10 px-4 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
