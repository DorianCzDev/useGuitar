import ProductsContainer from "@/app/_components/ProductsContainer";
import { getProductsByCategory } from "@/app/_lib/productsController";
import { PageSearchParamsProps } from "@/app/_types/types";

export const metadata = {
  title: "Amplifiers",
};

async function Page({ searchParams }: PageSearchParamsProps) {
  const category = "amplifier";
  const { products, productsCount } = await getProductsByCategory({
    searchParams,
    category,
  });
  return (
    <ProductsContainer products={products} productsCount={productsCount} />
  );
}

export default Page;
