import OrdersList from "@/app/_components/OrdersList";
import { getUserOrders } from "@/app/_lib/ordersController";

async function Page() {
  const { orders } = await getUserOrders();
  return <OrdersList orders={orders} />;
}

export default Page;
