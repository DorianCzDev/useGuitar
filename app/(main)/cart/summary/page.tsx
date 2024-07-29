import OrderSummary from "@/app/_components/OrderSummary";
import {
  getAllDeliveries,
  getProductsFromCart,
} from "@/app/_lib/productsController";

export const metadata = {
  title: "Cart Summary",
};

async function Page({ searchParams }: { searchParams: { id: string } }) {
  const { id } = searchParams;
  const { products: cartProducts } = await getProductsFromCart(id);
  const { deliveries } = await getAllDeliveries();
  return (
    <>
      <OrderSummary cartProducts={cartProducts} deliveries={deliveries} />
    </>
  );
}

export default Page;
