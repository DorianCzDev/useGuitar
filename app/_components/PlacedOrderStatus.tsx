function PlacedOrderStatus({
  order,
}: {
  order: {
    _id: string;
    status: string;
  };
}) {
  const { _id: id, status } = order;
  return (
    <div className="text-slate-50 bg-secondary-500 rounded-xl w-max relative py-5 px-7 flex flex-col items-center min-w-[380px] md:mb-5 md:w-full md:min-w-full">
      <p className="text-lg py-2 tracking-wide uppercase">Order id</p>
      <p className="text-lg py-2 tracking-wide">{id}</p>
      <p className="text-lg py-2 tracking-wide uppercase">Status</p>
      <p className="text-lg py-2 tracking-wide">{status}</p>
    </div>
  );
}

export default PlacedOrderStatus;
