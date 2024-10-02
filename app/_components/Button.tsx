import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-slate-50 text-2xl w-full bg-secondary-500 border-none outline-none py-2 transition-all mt-5 tracking-widest flex items-center justify-center min-h-12 cursor-pointer font-bold hover:bg-secondary-600 disabled:opacity-50 disabled:bg-secondary-600 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default Button;
