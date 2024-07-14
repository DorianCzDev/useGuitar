import CartSummary from "@/app/_components/CartSummary";
import CartTable from "@/app/_components/CartTable";
import EmptyCart from "@/app/_components/EmptyCart";
import { getProductsFromCart } from "@/app/_lib/productsController";

async function Page({ searchParams }: { searchParams: { id: string } }) {
  const { id } = searchParams;

  if (!id) return <EmptyCart />;

  const { products } = await getProductsFromCart(id);

  return (
    <div className="grid grid-cols-[1fr_450px] mx-auto mt-12 mb-20 w-full relative">
      <CartTable products={products} />
      <CartSummary />
    </div>
  );
}

export default Page;
