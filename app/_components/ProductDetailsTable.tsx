import AmplifierDetailsTable from "./AmplifierDetailsTable";
import GuitarDetailsTable from "./GuitarDetailsTable";
import MultiEffectDetailsTable from "./MultiEffectDetailsTable";
import PickupDetailsTable from "./PickupDetailsTable";
import { ProductDetailsRow, ProductDetailsRowValue } from "./ProductDetailsRow";

type ProductDetailsTableProps = {
  product: {
    subcategory: string;
    inventory: number;
    category: string;
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
    effectsProcessor: boolean | string;
    power: number;
    memorySlots: number;
    channels: number;
    footSwitchConnection: boolean | string;
    headphoneOutput: boolean | string;
    reverb: boolean | string;
    recordingOutput: boolean | string;
    output: "high" | "medium" | "low";
    active: boolean | string;
    pickup: string;
    wiring: number;
    pickupStringsNumber: number;
    kappe: boolean | string;
    effects: boolean | string;
    ampModeling: boolean | string;
    drumComputer: boolean | string;
    auxPort: boolean | string;
  };
};

function ProductDetailsTable({ product }: ProductDetailsTableProps) {
  const { subcategory, inventory, category } = product;

  return (
    <div className="grid grid-cols-[550px_550px] mt-10 mb-14 w-fit mx-auto">
      <ProductDetailsRow>
        Category
        <ProductDetailsRowValue>{subcategory}</ProductDetailsRowValue>
      </ProductDetailsRow>
      <ProductDetailsRow>
        Avaliable
        <ProductDetailsRowValue>
          {inventory > 0 ? "Yes" : "No"}
        </ProductDetailsRowValue>
      </ProductDetailsRow>
      {category === "guitar" && <GuitarDetailsTable product={product} />}
      {category === "amplifier" && <AmplifierDetailsTable product={product} />}
      {category === "pickup" && <PickupDetailsTable product={product} />}
      {category === "multi effect" && (
        <MultiEffectDetailsTable product={product} />
      )}
    </div>
  );
}

export default ProductDetailsTable;
