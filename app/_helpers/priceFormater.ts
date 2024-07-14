export default function priceFormater(price: number) {
  if (price % 100 === 0) {
    return `${price / 100}.00`;
  } else if ((price / 100).toString().split(".")[1].length === 1) {
    return `${price / 100}0`;
  } else return `${price / 100}`;
}
