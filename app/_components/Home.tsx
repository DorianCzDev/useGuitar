"use client";

import { SingleProductType } from "../_types/types";
import ProductElement from "./ProductElement";

function Home({
  discountedProducts,
  featuredProducts,
}: {
  discountedProducts: SingleProductType[];
  featuredProducts: SingleProductType[];
}) {
  return (
    <main className="w-[1300px] mx-auto xl:w-full xl:px-10">
      <h1 className="text-4xl font-bold tracking-widest p-2 mb-10 text-left">
        Best Deals
      </h1>
      <ul className="list-none flex flex-wrap sm:mx-auto sm:justify-center">
        {discountedProducts.map((product: SingleProductType) => (
          <ProductElement product={product} key={product._id} />
        ))}
      </ul>

      <h1 className="text-4xl font-bold tracking-widest p-2 mb-10 text-left">
        We Recomended
      </h1>
      <ul className="list-none flex flex-wrap sm:mx-auto sm:justify-center">
        {featuredProducts.map((product: SingleProductType) => (
          <ProductElement product={product} key={product._id} />
        ))}
      </ul>
    </main>
  );
}

export default Home;
