"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AccountSidebar() {
  const pathname = usePathname();
  return (
    <ul className="list-none">
      <Link href={"/account/user"} className="">
        <li
          className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-neutral-200 ${
            pathname.includes("user") ? "text-neutral-200" : "text-neutral-500"
          }`}
        >
          user data
        </li>
      </Link>
      <Link href={"/account/changePassword"}>
        <li
          className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-neutral-200 ${
            pathname.includes("changePassword")
              ? "text-neutral-200"
              : "text-neutral-500"
          }`}
        >
          change Password
        </li>
      </Link>
      <Link href={"/account/myOrders"}>
        <li
          className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-neutral-200 ${
            pathname.includes("myOrders")
              ? "text-neutral-200"
              : "text-neutral-500"
          }`}
        >
          my orders
        </li>
      </Link>
      <li
        className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-neutral-200 text-neutral-500 `}
      >
        Logout
      </li>
    </ul>
  );
}

export default AccountSidebar;
