import OrdersList from "@/app/_components/OrdersList";
import { getUserOrders } from "@/app/_lib/ordersController";

export const metadata = {
  title: "Your orders",
};

async function Page() {
  const { orders } = await getUserOrders();
  return <OrdersList orders={orders} />;
}

export default Page;
