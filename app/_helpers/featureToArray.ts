import { SingleProductType } from "../_types/types";

export default function featureToArray(
  products: SingleProductType[],
  feature: string
) {
  let featureArray = products.map((product: any) => {
    return product?.[feature];
  });

  featureArray = featureArray.reduce((prev, cur) => {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});
  return Object.entries(featureArray);
}
