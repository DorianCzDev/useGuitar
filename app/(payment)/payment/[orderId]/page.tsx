import PaymentContainer from "@/app/_components/PaymentContainer";
import { getOrder } from "@/app/_lib/ordersController";

async function Page({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const { order } = await getOrder(orderId);

  return <PaymentContainer order={order} />;
}

export default Page;
