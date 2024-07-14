import { ChildrenOnlyProps } from "../_types/types";

function ErrorSpan({ children }: ChildrenOnlyProps) {
  return (
    <span className="pt-1 text-sm text-red-500 m-auto tracking-wider">
      {children}
    </span>
  );
}

export default ErrorSpan;
