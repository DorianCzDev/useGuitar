import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type PaginationProps = {
  productsCount: number;
  currPage: number | string;
  setCurrPage: () => void;
};

function Pagination({ productsCount, currPage, setCurrPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const limit = 12;
  const pagesCount = Math.floor(productsCount / limit + 1);
  const pagesArray = [];

  for (let i = 1; i <= pagesCount; i++) {
    pagesArray.push(i);
  }

  useEffect(() => {
    params.set("page", currPage);
    if (Number(params.get("page")) > pagesCount) {
      params.set("page", "1");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currPage, params, pagesCount]);

  return (
    <>
      {pagesArray.length > 1 && (
        <div className="flex justify-end items-center text-primary-50 pb-5">
          <span
            onClick={() => {
              setCurrPage((c) => (c > 1 ? c - 1 : c));
              window.scrollTo(0, 360);
            }}
            className="text-xl cursor-pointer mt-1"
          >
            <IoIosArrowBack />
          </span>
          {pagesArray.map((page) => (
            <li
              onClick={() => {
                setCurrPage(page);
                window.scrollTo(0, 360);
              }}
              className={`text-lg list-none m-[6px] cursor-pointer hover:text-secondary-600 ${
                page === currPage && "text-secondary-500 font-bold"
              }`}
              key={page}
            >
              {page}
            </li>
          ))}
          <span
            onClick={() => {
              setCurrPage((c) => (c < pagesCount ? c + 1 : c));
              window.scrollTo(0, 360);
            }}
            className="text-xl cursor-pointer mt-1 "
          >
            <IoIosArrowForward />
          </span>
        </div>
      )}
    </>
  );
}

export default Pagination;
