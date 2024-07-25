"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../_lib/actions";
import toast from "react-hot-toast";

function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <ul className="list-none">
      <Link href={"/account/user"} className="">
        <li
          className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-neutral-200 lg:justify-center ${
            pathname.includes("user") ? "text-neutral-200" : "text-neutral-500"
          }`}
        >
          user data
        </li>
      </Link>
      <Link href={"/account/change-password"}>
        <li
          className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-neutral-200 lg:justify-center ${
            pathname.includes("change-password")
              ? "text-neutral-200"
              : "text-neutral-500"
          }`}
        >
          change Password
        </li>
      </Link>
      <Link href={"/account/my-orders"}>
        <li
          className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-neutral-200 lg:justify-center ${
            pathname.includes("my-orders")
              ? "text-neutral-200"
              : "text-neutral-500"
          }`}
        >
          my orders
        </li>
      </Link>
      <li
        onClick={async () => {
          const { msg, status } = await logout();
          router.push("/");
          if (status === 200) {
            toast.success(msg);
          } else toast.error(msg);
        }}
        className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-neutral-200 text-neutral-500  lg:justify-center`}
      >
        Logout
      </li>
    </ul>
  );
}

export default AccountSidebar;
