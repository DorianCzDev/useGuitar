import "@/app/_models/Product";
import "@/app/_models/Review";
import { getSingleProduct } from "@/app/_lib/productsController";
import { getProductReviews } from "@/app/_lib/reviewsController";

import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import ProductDetailsHeader from "@/app/_components/ProductDetailsHeader";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ProductDetailsTable from "@/app/_components/ProductDetailsTable";
import ProductDetailsDescription from "@/app/_components/ProductDetailsDescription";
import Reviews from "@/app/_components/Reviews";

async function Page({ params, searchParams }: Params) {
  let { productName } = params;
  productName = productName.replaceAll("_", " ");
  let { product } = await getSingleProduct({ productName });
  const { id, averageRating }: { id: string; averageRating: number } = product;

  let { ratingsCount, reviews } = await getProductReviews({
    id,
    searchParams,
  });

  return (
    <div>
      <Suspense key={productName} fallback={<Spinner />}>
        <ProductDetailsHeader product={product} />
        <article className="mx-auto">
          <ProductDetailsTable product={product} />
          <ProductDetailsDescription description={product.description} />
        </article>
        <section>
          <Reviews
            productId={product._id}
            ratingsCount={ratingsCount}
            reviews={reviews}
            averageRating={averageRating}
          />
        </section>
      </Suspense>
    </div>
  );
}

export default Page;
