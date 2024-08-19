import connectMongo from "@/app/_lib/connectDB.ts";
import Review from "@/app/_models/Review";
import featureToArray from "../_helpers/featureToArray";

export async function getProductReviews({ searchParams, id }) {
  await connectMongo();

  const { rating } = searchParams;

  let reviews = await Review.find({ product: id });

  let ratingsCount = [
    ["1", 0],
    ["2", 0],
    ["3", 0],
    ["4", 0],
    ["5", 0],
  ];

  const ratingsArray = featureToArray(reviews, "rating");

  for (const ratingCount of ratingsCount) {
    for (const ratingArray of ratingsArray) {
      if (ratingCount[0] === ratingArray[0]) ratingCount[1] = ratingArray[1];
    }
  }

  if (!rating) {
    reviews = await Review.find({ product: id });
  } else {
    reviews = await Review.find({ product: id, rating });
  }

  reviews = JSON.parse(JSON.stringify(reviews));

  return { ratingsCount, reviews };
}
