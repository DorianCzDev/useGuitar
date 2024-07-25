import Header from "./_components/Header";
import Home from "./_components/Home";

import {
  getDiscountedProducts,
  getFeaturedProducts,
} from "./_lib/productsController";

async function Page() {
  const { products: discountedProducts } = await getDiscountedProducts();
  const { products: featuredProducts } = await getFeaturedProducts();

  return (
    <div className="font-bold mx-auto text-center">
      <Header />
      <Home
        discountedProducts={discountedProducts}
        featuredProducts={featuredProducts}
      />
    </div>
  );
}

export default Page;
