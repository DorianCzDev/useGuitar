"use client";

import { usePathname } from "next/navigation";
import GuitarFilters from "./GuitarFilters";
import AmplifierFillters from "./AmplifierFillters";
import PickupFilters from "./PickupFilters";
import MultiEffectFilters from "./MultiEffectFilters";

type FilterProps = {
  productsBody: string[];
  productsNeck: string[];
};

function Filter({ productsBody, productsNeck }: FilterProps) {
  const pathname = usePathname();
  if (pathname.includes("guitars"))
    return (
      <GuitarFilters productsBody={productsBody} productsNeck={productsNeck} />
    );
  if (pathname.includes("amplifiers")) return <AmplifierFillters />;
  if (pathname.includes("pickups")) return <PickupFilters />;
  if (pathname.includes("multiEffects")) return <MultiEffectFilters />;
}

export default Filter;
