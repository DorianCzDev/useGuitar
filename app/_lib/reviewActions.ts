"use server";

import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Product from "../_models/Product";
import Review from "../_models/Review";
import { AccessTokenJwtPayload } from "../_types/types";
import connectMongo from "./connectDB";

export async function createReview({
  productId,
  reviewBody,
}: {
  productId: string;
  reviewBody: {
    user?: string;
    product?: string;
    rating: any;
    comment: string;
  };
}) {
  try {
    await connectMongo();
  } catch (error: any) {
    return {
      data: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.errorResponse.errmsg,
      },
    };
  }
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return {
      data: {
        msg: "You must be logged in.",
        status: StatusCodes.UNAUTHORIZED,
      },
    };
  }
  const {
    user: { userId },
  } = jwt.verify(
    accessToken!,
    process.env.JWT_SECRET!
  ) as AccessTokenJwtPayload;

  if (!userId) {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    return {
      data: {
        msg: "Something went wrong",
        status: StatusCodes.UNAUTHORIZED,
      },
    };
  }

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: `No product with id: ${productId}`,
      },
    };
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: userId,
  });

  if (alreadySubmitted) {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: 'Already submitted review for this product"',
      },
    };
  }
  reviewBody.user = userId;
  reviewBody.product = productId;

  let review;

  try {
    review = await Review.create(reviewBody);
  } catch (error: any) {
    return {
      data: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error?.errors?.comment?.properties?.message
          ? error.errors.comment.properties.message
          : error.errorResponse.errmsg,
      },
    };
  }

  review = JSON.stringify(review);

  revalidatePath("/products");

  return { data: { status: StatusCodes.CREATED, msg: "Review added" } };
}

export async function reportReview(id: string) {
  try {
    await connectMongo();
  } catch (error: any) {
    return {
      data: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.errorResponse.errmsg,
      },
    };
  }

  const review = await Review.findOne({ _id: id });

  review.isReported = true;

  try {
    await review.save();
  } catch (error: any) {
    return {
      data: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error?.errors?.comment?.properties?.message
          ? error.errors.comment.properties.message
          : error.errorResponse.errmsg,
      },
    };
  }

  return { data: { msg: "Review reported.", status: StatusCodes.OK } };
}
