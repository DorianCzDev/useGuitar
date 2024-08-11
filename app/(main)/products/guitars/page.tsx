import ProductsContainer from "@/app/_components/ProductsContainer";
import { getProductsByCategory } from "@/app/_lib/productsController";
import { PageSearchParamsProps } from "@/app/_types/types";

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
    <ProductsContainer
      products={products}
      productsBody={productsBody}
      productsNeck={productsNeck}
      productsCount={productsCount}
    />
  );
}

export default Page;

// return <ProductList products={JSON.parse(JSON.stringify(products))} />;
