"use client";
import { useSelector } from "react-redux";
import { getTotalCartPrice } from "../_utils/cartSlice";
import priceFormater from "../_helpers/priceFormater";
import Button from "./Button";
import { useEffect, useState } from "react";
import SpinnerMini from "./SpinnerMini";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function CartSummary() {
  const price = useSelector(getTotalCartPrice);
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <aside className="sticky w-4/5 top-56 h-[450px] mx-auto mt-8">
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
          const { status }: { status: number } = data;
          if (status !== 401) {
            return router.push("/cart/update-user");
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
