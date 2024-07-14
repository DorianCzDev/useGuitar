import booleanConverter from "../_helpers/booleanConverter";
import { ProductDetailsRow, ProductDetailsRowValue } from "./ProductDetailsRow";

type AmplifierDetailsTableProps = {
  product: {
    effectsProcessor: boolean | string;
    power: number;
    memorySlots: number;
    channels: number;
    footSwitchConnection: boolean | string;
    headphoneOutput: boolean | string;
    reverb: boolean | string;
    recordingOutput: boolean | string;
  };
};

function AmplifierDetailsTable({ product }: AmplifierDetailsTableProps) {
  const {
    effectsProcessor,
    power,
    memorySlots,
    channels,
    footSwitchConnection,
    headphoneOutput,
    reverb,
    recordingOutput,
  } = product;
  return (
    <>
      <ProductDetailsRow>
        Effects processor
        <ProductDetailsRowValue>
          {booleanConverter(effectsProcessor)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Power
        <ProductDetailsRowValue>{power}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Memory slots
        <ProductDetailsRowValue>{memorySlots}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Channels
        <ProductDetailsRowValue>{channels}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Foot Switch Connection
        <ProductDetailsRowValue>
          {booleanConverter(footSwitchConnection)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Headphone Output
        <ProductDetailsRowValue>
          {booleanConverter(headphoneOutput)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Reverb
        <ProductDetailsRowValue>
          {booleanConverter(reverb)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Recording output
        <ProductDetailsRowValue>
          {booleanConverter(recordingOutput)}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
    </>
  );
}

export default AmplifierDetailsTable;
