import priceFormater from "../_helpers/priceFormater";

type OrderSummaryPriceAsideProps = {
  deliveryDetails: {
    cost: number;
  };
  totalCartPrice: number;
  totalPrice: number;
};

function OrderSummaryPriceAside({
  deliveryDetails,
  totalCartPrice,
  totalPrice,
}: OrderSummaryPriceAsideProps) {
  return (
    <>
      <h1 className="text-[40px] font-bold text-center tracking-widest  mb-3 text-fontPrimary-600">
        Summary
      </h1>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl tracking-wide">Estimated Total:</span>
        <span className="text-xl tracking-wide font-bold">
          $ {priceFormater(totalCartPrice)}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4 text-lg tracking-wide">
        Delivery cost:{" "}
        <span>
          {deliveryDetails.cost === 0
            ? "-"
            : `$ ${priceFormater(deliveryDetails.cost)}`}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4 text-xl font-bold tracking-wide border-t border-primary-700 pt-4">
        Total price: <span>$ {priceFormater(totalPrice)}</span>
      </div>
    </>
  );
}

export default OrderSummaryPriceAside;
