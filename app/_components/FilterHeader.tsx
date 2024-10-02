import { useSearchParams } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction } from "react";

type FilterHeaderProps = {
  children: ReactNode;
  openIcon: ReactNode;
  closeIcon: ReactNode;
  isOpenName: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<string[]>>;
};

function FilterHeader({
  children,
  openIcon,
  closeIcon,
  isOpenName,
  isOpen,
  setIsOpen,
}: FilterHeaderProps) {
  const searchParams = useSearchParams();

  function handleClick() {
    setIsOpen((cur) => {
      if (cur.includes(isOpenName)) {
        const newIsOpen = cur.filter((item: string) => item !== isOpenName);
        return [...newIsOpen];
      } else {
        return [...cur, isOpenName];
      }
    });
  }

  const isActive = searchParams.get(isOpenName);

  return (
    <header
      onClick={handleClick}
      className={`flex border-b border-primary-600 cursor-pointer ${
        isActive ? "text-fontPrimary-500" : "text-fontPrimary-700"
      } font-bold tracking-wider`}
    >
      <h1 className="flex uppercase text-xl pt-4 pb-3 flex-grow justify-start">
        {children}
      </h1>
      <div className="m-auto cursor-pointer bg-transparent text-2xl">
        {isOpen ? closeIcon : openIcon}
      </div>
    </header>
  );
}

export default FilterHeader;
