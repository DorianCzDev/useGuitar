import { ReactNode, useEffect, useState } from "react";

type FilterListProps = {
  children: ReactNode;
  isOpen: boolean;
  listLength: "long" | "short";
};

function FilterList({ children, isOpen, listLength }: FilterListProps) {
  const [isInitialOpen, setIsInitialOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsInitialOpen(true);
    }
  }, [isOpen]);

  if (!isInitialOpen) {
    return (
      <ul
        className={` list-none overflow-y-hidden text-neutral-400 font-bold
      max-h-0
    `}
      >
        {children}
      </ul>
    );
  } else
    return (
      <ul
        className={`${
          isOpen && listLength === "long"
            ? `animate-[slideOut_1.20s_forwards]`
            : !isOpen && listLength === "long"
            ? `animate-[slideIn_0.90s_forwards]`
            : isOpen && listLength === "short"
            ? `animate-[slideOut_1.10s_forwards]`
            : !isOpen &&
              listLength === "short" &&
              "animate-[slideIn_0.75s_forwards]"
        } list-none ${
          listLength === "short" ? "overflow-y-hidden" : "overflow-y-auto"
        } text-neutral-400 font-bold `}
      >
        {children}
      </ul>
    );
}

export default FilterList;
