"use client";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

import Link from "next/link";
import { ChildrenOnlyProps } from "../_types/types";
import priceFormater from "../_helpers/priceFormater";
import { useSelector } from "react-redux";
import { createValidProductObject } from "@/app/_helpers/createValidProductObject";
import { getTotalCartPrice } from "../_utils/cartSlice";
import OrderSummaryPriceAside from "./OrderSummaryPriceAside";
import OrderCustomerDetails from "./OrderCustomerDetails";
import DeliveryMethod from "./DeliveryMethod";
import { createOrder } from "../_lib/actions";
import Button from "./Button";
import { useRouter } from "next/navigation";
import setLocalStorageItem from "../_helpers/setLocalStorageItem";

type OrderSummaryProps = {
  cartProducts: {};
  deliveries: {
    supplier: string;
    cost: number;
    time: number;
  };
};

function OrderSummary({ cartProducts, deliveries }: OrderSummaryProps) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [deliveryDetails, setDeliveryDetails] = useState({
    supplier: "",
    cost: 0,
  });

  const cart = useSelector((state) => state.cart.cartAfterFetch);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;

  const user = { ...data.user };

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

    await createOrder({ body });

    let {
      status,
      data: { order },
    } = await createOrder({ body });
    order = JSON.parse(order);
    if (status === 201) {
      setLocalStorageItem("cart", "");
      router.push(`/payment/${order._id}`);
    }
  }

  return (
    <div className="mt-10 mx-auto grid grid-cols-[1fr_450px] relative">
      <article>
        <h1 className="text-[40px] font-bold tracking-widest p-2 mb-6 text-neutral-400">
          Order overview
        </h1>
        <OrderCustomerDetails user={user} />
        <div className="mt-5">
          <OrderSummaryTableHeader>
            <OrderSummarySpan></OrderSummarySpan>
            <OrderSummarySpan>Name</OrderSummarySpan>
            <OrderSummarySpan>Unit price</OrderSummarySpan>
            <OrderSummarySpan>Amount</OrderSummarySpan>
            <OrderSummarySpan>Total price</OrderSummarySpan>
          </OrderSummaryTableHeader>
          {products.map((product) => (
            <OrderSummaryTableRow key={product._id}>
              <div className=" my-auto px-6 flex justify-center items-center">
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
                $ {priceFormater(product.price)}
              </OrderSummaryNumberSpan>
              <OrderSummaryNumberSpan>
                {product.quantity}
              </OrderSummaryNumberSpan>
              <OrderSummaryNumberSpan>
                $ {priceFormater(product.price * product.quantity)}
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
      <aside className="sticky top-[300px] w-[84%] h-fit py-4 px-7 rounded-2xl bg-accent-500 mt-8 mx-auto">
        <OrderSummaryPriceAside
          deliveryDetails={deliveryDetails}
          totalCartPrice={totalCartPrice}
          totalPrice={totalPrice}
        />
        <div className="pb-4">
          <Button onClick={handleButton} disabled={deliveryDetails.cost === 0}>
            Pay and order
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

function OrderSummaryTableHeader({ children }: ChildrenOnlyProps) {
  return (
    <div className="grid grid-cols-[80px_1fr_140px_120px_180px] border border-primary-700 rounded-t-lg h-[60px] w-full">
      {children}
    </div>
  );
}

function OrderSummarySpan({ children }: ChildrenOnlyProps) {
  return <span className=" my-auto px-6 font-light text-lg">{children}</span>;
}

function OrderSummaryNumberSpan({ children }: ChildrenOnlyProps) {
  return <span className=" my-auto  font-light text-lg pl-10">{children}</span>;
}

function OrderSummaryTableRow({ children }: ChildrenOnlyProps) {
  return (
    <div className="grid grid-cols-[80px_1fr_140px_120px_180px] border-b border-l border-r border-primary-700  h-[70px] w-full bg-accent-500">
      {children}
    </div>
  );
}

function OrderSummaryTableFooter({ children }: ChildrenOnlyProps) {
  return (
    <div className="flex justify-end items-center pr-10 border-l border-r border-b rounded-b-xl h-[60px] w-full border-primary-700">
      {children}
    </div>
  );
}
