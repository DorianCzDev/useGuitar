"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { StateCart } from "../_types/types";
import { FaSun, FaMoon } from "react-icons/fa";
function Menu() {
  const curCart = useSelector((state: { cart: StateCart }) => state.cart.cart);
  let idString = "";
  curCart.map((item, index) => {
    if (index === curCart.length - 1) {
      idString = `${idString}${item}`;
    } else idString = `${idString}${item}-`;
  });

  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto w-full flex justify-around">
      <div className="flex justify-center items-center basis-1/3 ">
        <div className="text-5xl cursor-pointer  hover:text-fontPrimary-700 transition-all">
          {theme === `light` && (
            <FaMoon
              onClick={() => {
                setTheme(`dark`);
              }}
              className="h-12 sm:h-10"
            />
          )}
          {(theme === `dark` || !theme || theme === "system") && (
            <FaSun
              onClick={() => {
                setTheme(`light`);
              }}
              className="h-12 sm:h-10"
            />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center basis-1/3">
        <Link href={"/"}>
          {theme === "dark" ? (
            <img
              src="/logo-white-no-background.svg"
              alt="logo"
              className="object-cover aspect-[4/2] w-[300px] max-w-fit sm:w-[180px]"
            />
          ) : (
            <img
              src="/logo-black.svg"
              alt="logo"
              className="object-cover aspect-[4/2] w-[300px] max-w-fit sm:w-[180px]"
            />
          )}
        </Link>
      </div>
      <div className="flex justify-center items-center basis-1/3 gap-7 sm:gap-1">
        <Link href={"/account/user"}>
          <span className="text-5xl cursor-pointer  hover:text-fontPrimary-700 transition-all text-fontPrimary-500">
            <MdOutlineAccountCircle className="h-12 sm:h-10" title="Account" />
          </span>
        </Link>
        <Link href={`/cart?id=${idString}`} className="text-5xl cursor-pointer">
          <div className="w-16 h-16 flex justify-center items-center relative bg-secondary-500 rounded-full hover:bg-secondary-600 transition-all text-slate-50">
            <IoCartOutline className="h-12 sm:h-10" title="Cart" />
            <div className="absolute right-1 bottom-2 bg-white rounded-full text-black flex justify-center items-center font-bold text-base h-6 w-6">
              {curCart?.length > 9 ? "9+" : curCart?.length || "0"}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
