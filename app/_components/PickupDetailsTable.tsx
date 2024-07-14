import booleanConverter from "../_helpers/booleanConverter";
import { ProductDetailsRow, ProductDetailsRowValue } from "./ProductDetailsRow";

type PickupDetailsTableProps = {
  product: {
    output: "high" | "medium" | "low";
    active: boolean | string;
    pickup: string;
    wiring: number;
    pickupStringsNumber: number;
    kappe: boolean | string;
  };
};

function PickupDetailsTable({ product }: PickupDetailsTableProps) {
  const { output, active, pickup, wiring, pickupStringsNumber, kappe } =
    product;
  return (
    <>
      <ProductDetailsRow>
        output
        <ProductDetailsRowValue>{output}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        active
        <ProductDetailsRowValue>
          {booleanConverter(active)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        pickup type
        <ProductDetailsRowValue> {pickup}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        wiring
        <ProductDetailsRowValue> {wiring}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Pickup strings number
        <ProductDetailsRowValue>{pickupStringsNumber}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        kappe
        <ProductDetailsRowValue>
          {booleanConverter(kappe)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
    </>
  );
}

export default PickupDetailsTable;
