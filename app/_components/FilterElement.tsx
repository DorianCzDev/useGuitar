import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type FilterListProps = {
  children?: ReactNode;
  selectedIcon?: ReactNode;
  unselectedIcon?: ReactNode;
  inputIcon?: ReactNode;
  elementType: "list" | "boolean" | "input";
  queryName: string;
  queryValue?: string;
  onFilter: (queryName: string, queryValue?: string) => void;
};
function FilterElement({
  children,
  selectedIcon,
  unselectedIcon,
  inputIcon,
  elementType,
  queryName,
  queryValue,
  onFilter,
}: FilterListProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const isSelected = params.get(queryName) === queryValue;

  if (elementType === "list")
    return (
      <li
        onClick={() => onFilter(queryName, queryValue)}
        className={`flex items-center uppercase hover:text-neutral-200 tracking-widest ${
          isSelected && "text-neutral-200"
        }`}
      >
        <button className="bg-transparent border-none outline-none font-bold uppercase p-3 w-3/4 cursor-pointer text-left transition-colors flex-grow">
          {children}
        </button>
        <div className="text-2xl cursor-pointer m-auto">
          {isSelected ? selectedIcon : unselectedIcon}
        </div>
      </li>
    );
  if (elementType === "input")
    return (
      <li className="flex justify-evenly items-center uppercase p-4 font-normal">
        <input
          onChange={(e) => onFilter(`min-${queryName}`, e.target.value)}
          className="text-neutral-400 border border-primary-600 bg-accent-500 outline-none p-2 w-20 focus:border-primary-500"
          placeholder="min"
        />
        <div className="text-3xl text-primary-500">{inputIcon}</div>
        <input
          onChange={(e) => onFilter(`max-${queryName}`, e.target.value)}
          className="text-neutral-400 border border-primary-600 bg-accent-500 outline-none p-2 w-20 focus:border-primary-500 "
          placeholder="max"
        />
      </li>
    );
  if (elementType === "boolean")
    return (
      <>
        <li
          onClick={() => onFilter(queryName, queryValue)}
          className={`flex flex-wrap justify-evenly items-center  uppercase hover:text-neutral-200 tracking-widest  ${
            isSelected && "text-neutral-200"
          }`}
        >
          <button className="bg-transparent border-none outline-none font-bold uppercase p-3 w-3/4 cursor-pointer text-left transition-colors flex-grow">
            {children}
          </button>
          <div className="text-2xl cursor-pointer m-auto">
            {isSelected ? selectedIcon : unselectedIcon}
          </div>
        </li>
      </>
    );
}

export default FilterElement;
