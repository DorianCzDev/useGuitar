"use client";

import { SingleProductType } from "../_types/types";
import ProductElement from "./ProductElement";

function ProductList({ products }: { products: SingleProductType[] }) {
  return (
    <>
      <ul className="pt-4 pl-12 flex flex-wrap list-none md:justify-center">
        {products.map((product) => (
          <ProductElement product={product} key={product._id} />
        ))}
      </ul>
    </>
  );
}

export default ProductList;
