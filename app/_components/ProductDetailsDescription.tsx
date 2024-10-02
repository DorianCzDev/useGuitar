import DescriptionFormater from "./DescriptionFormater";

function ProductDetailsDescription({ description }: { description: string }) {
  return (
    <div className="text-xl tracking-wider font-normal w-[800px] mx-auto text-fontPrimary-600 lg:w-full lg:text-fontPrimary-500">
      <h1 className="pt-4 pb-10 text-center border-b border-primary-700 text-2xl font-bold text-fontPrimary-500">
        DESCRIPTION
      </h1>
      <DescriptionFormater description={description} />
    </div>
  );
}

export default ProductDetailsDescription;
