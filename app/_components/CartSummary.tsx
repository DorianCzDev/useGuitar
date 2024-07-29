"use client";
import { useSelector } from "react-redux";
import { getTotalCartPrice } from "../_utils/cartSlice";
import priceFormater from "../_helpers/priceFormater";
import Button from "./Button";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import useAuth from "../_hooks/useAuth";
import { UserDataType } from "../_types/types";

function CartSummary() {
  const price = useSelector(getTotalCartPrice);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const data: UserDataType | null = useAuth({ setLoading });
  if (isLoading) return <Spinner />;

  return (
    <aside className="sticky w-4/5 top-56 h-[450px] mx-auto mt-8 lg:static lg:h-max">
      <h1 className="text-[40px] font-bold tracking-widest p-2 mb-3 text-neutral-300 text-center border-b border-primary-700">
        Summary
      </h1>
      <section className="flex justify-between items-center">
        <span className="text-xl tracking-wider text-neutral-300">
          Estimated Total:
        </span>
        <span className="text-xl tracking-wider text-neutral-200 font-bold">
          $ {priceFormater(price)}
        </span>
      </section>
      <Button
        disabled={isLoading}
        onClick={() => {
          const { status } = data as { status: number };
          if (status !== 401) {
            router.push("/cart/update-user");
          } else {
            toast.error("To place an order, please log in");
            router.push("/login");
          }
        }}
      >
        {isLoading ? <SpinnerMini /> : "Continue"}
      </Button>
    </aside>
  );
}

export default CartSummary;
