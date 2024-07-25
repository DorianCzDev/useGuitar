"use client";

import ProductElement from "./ProductElement";

type ProductsProps = {
  products: [];
  productsCount: number;
};

function ProductList({ products }: ProductsProps) {
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
