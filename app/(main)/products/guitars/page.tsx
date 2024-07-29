import ProductsContainer from "@/app/_components/ProductsContainer";
import Spinner from "@/app/_components/Spinner";
import { getProductsByCategory } from "@/app/_lib/productsController";
import { PageSearchParamsProps } from "@/app/_types/types";
import { Suspense } from "react";

export const metadata = {
  title: "Guitars",
};

async function Page({ searchParams }: PageSearchParamsProps) {
  const category = "guitar";
  const { products, productsCount, productsBody, productsNeck } =
    await getProductsByCategory({
      searchParams,
      category,
    });
  return (
    <Suspense fallback={<Spinner />} key={category}>
      <ProductsContainer
        products={products}
        productsBody={productsBody}
        productsNeck={productsNeck}
        productsCount={productsCount}
      />
    </Suspense>
  );
}

export default Page;

// return <ProductList products={JSON.parse(JSON.stringify(products))} />;
