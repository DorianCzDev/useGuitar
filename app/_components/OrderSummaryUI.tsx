import { ChildrenOnlyProps } from "../_types/types";

export function OrderSummaryTableHeader({ children }: ChildrenOnlyProps) {
  return (
    <div className="grid grid-cols-[80px_1fr_140px_120px_180px] border border-primary-700 rounded-t-lg h-[60px] w-full md:grid-cols-[35%_20%_20%_25%]">
      {children}
    </div>
  );
}

export function OrderSummarySpan({ children }: ChildrenOnlyProps) {
  return <span className=" my-auto px-6 font-light text-lg">{children}</span>;
}

export function OrderSummaryNumberSpan({ children }: ChildrenOnlyProps) {
  return (
    <span className=" my-auto  font-light text-lg pl-10 md:flex md:justify-center md:pl-2">
      {children}
    </span>
  );
}

export function OrderSummaryTableRow({ children }: ChildrenOnlyProps) {
  return (
    <div className="grid grid-cols-[80px_1fr_140px_120px_180px] border-b border-l border-r border-primary-700  min-h-[70px] w-full bg-accent-500 md:grid-cols-[35%_20%_20%_25%]">
      {children}
    </div>
  );
}

export function OrderSummaryTableFooter({ children }: ChildrenOnlyProps) {
  return (
    <div className="flex justify-end items-center pr-10 border-l border-r border-b rounded-b-xl h-[60px] min-h-[60px] w-full border-primary-700 md:h-max">
      {children}
    </div>
  );
}
