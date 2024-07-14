import booleanConverter from "../_helpers/booleanConverter";
import { ProductDetailsRow, ProductDetailsRowValue } from "./ProductDetailsRow";

type MultiEffectDetailsTableProps = {
  product: {
    effects: boolean | string;
    ampModeling: boolean | string;
    drumComputer: boolean | string;
    auxPort: boolean | string;
  };
};

function MultiEffectDetailsTable({ product }: MultiEffectDetailsTableProps) {
  const { effects, ampModeling, drumComputer, auxPort } = product;
  return (
    <>
      <ProductDetailsRow>
        effects
        <ProductDetailsRowValue>
          {booleanConverter(effects)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        amp modeling
        <ProductDetailsRowValue>
          {booleanConverter(ampModeling)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        drum computer
        <ProductDetailsRowValue>
          {booleanConverter(drumComputer)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        AUX Port
        <ProductDetailsRowValue>
          {booleanConverter(auxPort)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
    </>
  );
}

export default MultiEffectDetailsTable;
