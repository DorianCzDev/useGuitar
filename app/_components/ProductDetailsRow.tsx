import { ChildrenOnlyProps } from "../_types/types";

export function ProductDetailsRow({ children }: ChildrenOnlyProps) {
  return (
    <div className="flex items-center justify-between border-t border-primary-700 text-lg p-6 h-10 text-neutral-400 capitalize">
      {children}
    </div>
  );
}

export function ProductDetailsRowValue({ children }: ChildrenOnlyProps) {
  return (
    <span className="font-bold tracking-widest text-neutral-200">
      {children}
    </span>
  );
}
