"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { logout } from "../_lib/authActions";

function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    toast.loading("Loading...");
    startTransition(async () => {
      const { data } = await logout();
      if (data.status === 200) {
        router.push("/");
        toast.dismiss();
        toast.success(data.msg);
      } else {
        toast.dismiss();
        toast.error(data.msg);
      }
    });
  }

  return (
    <ul className="list-none">
      <Link href={"/account/user"}>
        <li
          className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-fontPrimary-500 lg:justify-center ${
            pathname.includes("user")
              ? "text-fontPrimary-500"
              : "text-fontPrimary-600"
          }`}
        >
          user data
        </li>
      </Link>
      <Link href={"/account/change-password"}>
        <li
          className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-fontPrimary-500 lg:justify-center ${
            pathname.includes("change-password")
              ? "text-fontPrimary-500"
              : "text-fontPrimary-700"
          }`}
        >
          change Password
        </li>
      </Link>
      <Link href={"/account/my-orders"}>
        <li
          className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-fontPrimary-500 lg:justify-center ${
            pathname.includes("my-orders")
              ? "text-fontPrimary-500"
              : "text-fontPrimary-700"
          }`}
        >
          my orders
        </li>
      </Link>
      <li
        onClick={handleLogout}
        className={`flex items-center justify-start uppercase tracking-widest font-bold cursor-pointer text-xl border-b border-primary-700 pb-3 pt-3 transition-all hover:text-fontPrimary-500 text-fontPrimary-700  lg:justify-center`}
      >
        Logout
      </li>
    </ul>
  );
}

export default AccountSidebar;
