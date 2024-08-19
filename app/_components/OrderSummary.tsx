"use client";
import { useState, useTransition } from "react";
import Spinner from "./Spinner";

import { createValidProductObject } from "@/app/_helpers/createValidProductObject";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import priceFormater from "../_helpers/priceFormater";
import setLocalStorageItem from "../_helpers/setLocalStorageItem";
import useAuth from "../_hooks/useAuth";
import { getTotalCartPrice } from "../_utils/cartSlice";
import Button from "./Button";
import DeliveryMethod from "./DeliveryMethod";
import OrderCustomerDetails from "./OrderCustomerDetails";
import OrderSummaryPriceAside from "./OrderSummaryPriceAside";
import {
  OrderSummaryNumberSpan,
  OrderSummarySpan,
  OrderSummaryTableFooter,
  OrderSummaryTableHeader,
  OrderSummaryTableRow,
} from "./OrderSummaryUI";
import SpinnerMini from "./SpinnerMini";
import { StateCartAfterFetchType, UserDataType } from "../_types/types";
import toast from "react-hot-toast";
import { createOrder } from "../_lib/orderActions";

type OrderSummaryProps = {
  cartProducts: [];
  deliveries: {
    supplier: string;
    cost: number;
    time: number;
  }[];
};

function OrderSummary({ cartProducts, deliveries }: OrderSummaryProps) {
  const [isLoading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [deliveryDetails, setDeliveryDetails] = useState({
    supplier: "",
    cost: 0,
  });

  const router = useRouter();
  const cart = useSelector(
    (state: StateCartAfterFetchType) => state.cart.cartAfterFetch
  );
  const totalCartPrice = useSelector(getTotalCartPrice);

  const data: UserDataType | null = useAuth({ setLoading });
  if (isLoading) return <Spinner />;
  if (data?.status !== 200 || !data?.user) {
    router.push("/login");
  }
  const user = { ...data?.user };

  if (isLoading) return <Spinner />;
  if (!cart || cart.length === 0) {
    router.push("/");
    return <></>;
  }

  const products = createValidProductObject(cartProducts, cart);

  const cartPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalPrice = deliveryDetails.cost
    ? cartPrice + deliveryDetails.cost
    : cartPrice + 0;

  const clientProducts = products.map((product) => {
    const object = {
      product: product._id,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
      name: product.name,
    };
    return object;
  });

  async function handleButton() {
    const body = {
      clientProducts,
      supplier: deliveryDetails.supplier,
      cost: deliveryDetails.cost,
      totalPrice,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      email: user.email,
      phoneNumber: user.phoneNumber,
      postCode: user.postCode,
      country: user.country,
    };

    startTransition(async () => {
      let { data }: any = await createOrder({ body });

      if (data.status === 201) {
        data.order = JSON.parse(data.order);
        setLocalStorageItem("cart", "");
        router.push(`/payment/${data.order._id}`);
      } else {
        toast.error(data.msg);
      }
    });
  }

  return (
    <div className="mt-10 mx-auto grid grid-cols-[1fr_450px] relative lg:block">
      <article>
        <h1 className="text-[40px] font-bold tracking-widest p-2 mb-6 text-neutral-400">
          Order overview
        </h1>
        <OrderCustomerDetails user={user} />
        <div className="mt-5">
          <OrderSummaryTableHeader>
            <span className=" my-auto px-6 font-light text-lg md:hidden"></span>
            <OrderSummarySpan>Name</OrderSummarySpan>
            <OrderSummarySpan>Unit price</OrderSummarySpan>
            <OrderSummarySpan>Amount</OrderSummarySpan>
            <OrderSummarySpan>Total price</OrderSummarySpan>
          </OrderSummaryTableHeader>
          {products.map((product) => (
            <OrderSummaryTableRow key={product._id}>
              <div className=" my-auto px-6 flex justify-center items-center md:hidden">
                <img
                  className="flex w-auto h-auto max-w-10 max-h-[60px] object-cover"
                  src={product.image}
                />
              </div>
              <OrderSummarySpan>
                <Link
                  href={`/products/${product.name.replaceAll(" ", "_")}`}
                  className="flex items-center min-h-10 uppercase"
                >
                  {product.name}
                </Link>
              </OrderSummarySpan>
              <OrderSummaryNumberSpan>
                {priceFormater(product.price)}
              </OrderSummaryNumberSpan>
              <OrderSummaryNumberSpan>
                {product.quantity}
              </OrderSummaryNumberSpan>
              <OrderSummaryNumberSpan>
                {priceFormater(product.price * product.quantity)}
              </OrderSummaryNumberSpan>
            </OrderSummaryTableRow>
          ))}
          <OrderSummaryTableFooter>
            <span className="my-auto px-6 font-light text-lg pr-10">
              Cart price:
            </span>
            <span className="my-auto px-6 font-light text-lg pr-6">
              $ {priceFormater(cartPrice)}
            </span>
          </OrderSummaryTableFooter>
        </div>
      </article>
      <aside className="sticky top-[300px] w-[84%] h-fit py-4 px-7 rounded-2xl bg-accent-500 mt-8 mx-auto lg:static">
        <OrderSummaryPriceAside
          deliveryDetails={deliveryDetails}
          totalCartPrice={totalCartPrice}
          totalPrice={totalPrice}
        />
        <div className="pb-4">
          <Button
            onClick={handleButton}
            disabled={deliveryDetails.cost === 0 || isPending}
          >
            {isPending ? <SpinnerMini /> : "Pay and order"}
          </Button>
        </div>
      </aside>
      <DeliveryMethod
        deliveries={deliveries}
        setDeliveryDetails={setDeliveryDetails}
      />
    </div>
  );
}

export default OrderSummary;
