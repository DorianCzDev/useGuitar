"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
  setCartAfterFetch,
} from "../_utils/cartSlice";
import Link from "next/link";
import {
  ChildrenOnlyProps,
  SingleProductType,
  StateCartAfterFetchType,
} from "../_types/types";
import { FaMinus, FaPlus } from "react-icons/fa6";
import priceFormater from "../_helpers/priceFormater";
import { MdDelete } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ProductsFromCart = {
  products: [
    {
      id: string;
      name: string;
      imageURL: string;
      price: number;
      quantity: number;
    }
  ];
};

function CartTable({ products }: ProductsFromCart) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setCartAfterFetch(products));
  }, []);

  const cart = useSelector(
    (state: StateCartAfterFetchType) => state.cart.cartAfterFetch
  );
  function handleDeleteItem(id: string) {
    const params = new URLSearchParams(searchParams);
    if (searchParams?.get("id")?.split("-")?.length! > 1) {
      let idArray: string | string[] | undefined = searchParams
        .get("id")
        ?.split("-");

      idArray = idArray?.filter((idElement: string) => idElement !== id);
      idArray = idArray?.toString();
      idArray = idArray?.replaceAll(",", "-");
      params.set("id", idArray!);
    } else {
      params.delete("id");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    dispatch(deleteItem(id));
  }

  return (
    <div>
      <h1 className="text-5xl font-bold tracking-widest p-2 mb-10 text-neutral-400 lg:text-center">
        Cart
      </h1>
      <article>
        {cart &&
          cart.map((product) => (
            <CartTableRow key={product._id}>
              <div className="flex justify-center items-center bg-white mr-5 md:hidden">
                <Link
                  href={`/products/${product.name.replaceAll(" ", "_")}`}
                  className="flex items-center min-h-10"
                >
                  <img
                    src={product.imageURL}
                    className="flex w-auto h-auto max-w-10 max-h-[60px] object-cover"
                  />
                </Link>
              </div>
              <Link
                href={`/products/${product.name.replaceAll(" ", "_")}`}
                className="flex items-center min-h-10"
              >
                <CartTableCol>{product.name}</CartTableCol>
              </Link>
              <CartTableCol>
                <QuantityContainer>
                  <Button
                    onClick={() => dispatch(decreaseItemQuantity(product._id))}
                  >
                    <FaMinus />
                  </Button>
                  {product.quantity}
                  <Button
                    onClick={() => dispatch(increaseItemQuantity(product._id))}
                  >
                    <FaPlus />
                  </Button>
                </QuantityContainer>
              </CartTableCol>
              <CartTableCol>$ {priceFormater(product.price)}</CartTableCol>
              <CartTableCol>
                <Button onClick={() => handleDeleteItem(product._id)}>
                  <MdDelete className="text-2xl" />
                </Button>
              </CartTableCol>
            </CartTableRow>
          ))}
      </article>
    </div>
  );
}
export default CartTable;

function CartTableRow({ children }: ChildrenOnlyProps) {
  return (
    <div className="w-[94%] grid grid-cols-[80px_1fr_200px_120px_80px] py-6 px-2 mx-auto mb-3 rounded-2xl bg-accent-500 text-neutral-200 h-[116px] md:grid-cols-[35%_25%_30%_10%]">
      {children}
    </div>
  );
}

function CartTableCol({ children }: ChildrenOnlyProps) {
  return (
    <div className="flex items-center text-lg uppercase font-bold tracking-wider">
      {children}
    </div>
  );
}

function QuantityContainer({ children }: ChildrenOnlyProps) {
  return (
    <div className="flex items-center justify-evenly h-10 w-[120px] bg-primary-900 rounded-xl">
      {children}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer border-none outline-none bg-transparent text-lg text-neutral-500 transition-all hover:text-neutral-400"
    >
      {children}
    </button>
  );
}
