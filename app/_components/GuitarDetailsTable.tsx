import booleanConverter from "../_helpers/booleanConverter";
import { ProductDetailsRow, ProductDetailsRowValue } from "./ProductDetailsRow";

type GuitarDetailsTableProps = {
  product: {
    body: string;
    neck: string;
    pickups: "H" | "HH" | "HHH" | "S" | "SS" | "SSS" | "HS" | "HHS";
    fretsNumber: number;
    pickupsActive: boolean | string;
    lefthanded: boolean | string;
    bridgePickup: string | null;
    neckPickup: string | null;
    middlePickup: string | null;
    stringsNumber: number;
  };
};

function GuitarDetailsTable({ product }: GuitarDetailsTableProps) {
  const {
    body,
    neck,
    pickups,
    fretsNumber,
    pickupsActive,
    lefthanded,
    bridgePickup,
    neckPickup,
    middlePickup,
    stringsNumber,
  } = product;
  return (
    <>
      <ProductDetailsRow>
        Body
        <ProductDetailsRowValue>{body}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Neck
        <ProductDetailsRowValue>{neck}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Pickups
        <ProductDetailsRowValue>
          {pickups ? pickups : "No Pickup"}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Frets
        <ProductDetailsRowValue>{fretsNumber}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Pickups active
        <ProductDetailsRowValue>
          {booleanConverter(pickupsActive)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Lefthanded
        <ProductDetailsRowValue>
          {booleanConverter(lefthanded)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Bridge pickup
        <ProductDetailsRowValue>
          {booleanConverter(bridgePickup)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Neck pickup
        <ProductDetailsRowValue>
          {booleanConverter(neckPickup)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Middle pickup
        <ProductDetailsRowValue>
          {booleanConverter(middlePickup)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Strings
        <ProductDetailsRowValue>{stringsNumber}</ProductDetailsRowValue>
      </ProductDetailsRow>
    </>
  );
}

export default GuitarDetailsTable;
