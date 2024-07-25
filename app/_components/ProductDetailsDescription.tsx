import DescriptionFormater from "./DescriptionFormater";

function ProductDetailsDescription({ description }: { description: string }) {
  return (
    <div className="text-xl tracking-wider font-light w-[800px] mx-auto text-neutral-300 lg:w-full lg:text-neutral-100">
      <h1 className="pt-4 pb-10 text-center border-b border-primary-700 text-2xl font-bold text-neutral-400">
        DESCRIPTION
      </h1>
      <DescriptionFormater description={description} />
    </div>
  );
}

export default ProductDetailsDescription;
