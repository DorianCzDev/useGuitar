import connectMongo from "@/app/_lib/connectDB.ts";
import Product from "@/app/_models/Product";
import Delivery from "@/app/_models/Delivery";

import featureToArray from "@/app/_helpers/featureToArray";
import CustomError from "@/app/_errors/index";

export async function getProducts() {
  await connectMongo();
  const products = await Product.find({});

  return products;
}

export async function getProductsByCategory({ searchParams, category }) {
  await connectMongo();

  let queryEntries = Object.entries(searchParams);

  let queryArray = [];
  let queryFilters = [];

  queryEntries.map((arrayEl) => {
    if (arrayEl[0].includes("min") || arrayEl[0].includes("max")) {
      if (arrayEl[0].includes("price")) {
        arrayEl[1] = arrayEl[1] * 100;
      }
      queryFilters = [...queryFilters, [arrayEl[0], arrayEl[1]]];
    } else {
      queryArray = [...queryArray, [arrayEl[0], arrayEl[1]]];
    }
  });

  let queryFiltersArray = [];
  queryFilters.map((arrayEl) => {
    const value = arrayEl[1];
    let items = [];
    if (arrayEl[0].includes("-")) {
      items = arrayEl[0].split("-");
    }
    const [operator, field] = items;

    queryFiltersArray = [...queryFiltersArray, [operator, field, value]];
  });

  let filtersObject = {};

  queryFiltersArray.map((arrayEl) => {
    let isFirtsTimeField = true;
    let [operator, field, value] = arrayEl;
    if (operator === "max") {
      operator = "$lte";
    } else if (operator === "min") {
      operator = "$gte";
    }
    const keys = Object.keys(filtersObject);
    let objectEl;
    keys.map((key) => {
      if (key === field) {
        filtersObject[key] = {
          ...filtersObject[key],
          [operator]: Number(value),
        };
        isFirtsTimeField = false;
      }
    });
    if (keys.length === 0 || isFirtsTimeField) {
      objectEl = {
        [field]: {
          [operator]: Number(value),
        },
      };
      filtersObject = { ...filtersObject, ...objectEl };
    }
  });

  const queryObjectFromArray = Object.fromEntries(queryArray);

  let queryObject = { ...queryObjectFromArray, ...filtersObject, category };

  if (queryObject.name) {
    queryObject.name = { $regex: queryObject.name, $options: "i" };
  }

  const { sortBy, page } = queryObject;
  delete queryObject.sortBy;
  delete queryObject.page;

  let result = Product.find(queryObject).select(
    "-description -updatedAt  -user"
  );

  let productsBody = [];
  let productsNeck = [];

  if (category === "guitar") {
    const allProducts = await Product.find(queryObject).select("body neck");
    productsBody = featureToArray(allProducts, "body");
    productsNeck = featureToArray(allProducts, "neck");
  }

  const productsCount = await Product.countDocuments(queryObject);

  if (sortBy) {
    result = result.sort(sortBy);
  } else {
    result = result.sort("createdAt");
  }

  const limit = 12;

  const skip = (page - 1) * limit;

  result = result.skip(skip || 0).limit(limit);

  let products = await result;

  products = JSON.parse(JSON.stringify(products));

  return { products, productsCount, productsBody, productsNeck };
}

export async function getSingleProduct({ productName }) {
  await connectMongo();

  let product = await Product.findOne({ name: productName }).populate({
    path: "reviews",
    select: "comment user rating",
  });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with name: ${productName}`);
  }
  product = JSON.parse(JSON.stringify(product));
  return { product };
}

export async function getProductsFromCart(id) {
  await connectMongo();
  if (!id) {
    throw new CustomError.BadRequestError("Your cart is empty");
  }
  const idArray = id.split("-");
  let products = [];
  for (const id of idArray) {
    let productModel = await Product.findOne({ _id: id }).select(
      "name category price images.imageURL"
    );
    const { _id, name, category, price, images } = productModel;
    const { imageURL } = images[0];
    const product = {
      _id,
      name,
      category,
      price,
      imageURL,
      quantity: 1,
    };
    products = [...products, product];
  }
  products = JSON.parse(JSON.stringify(products));
  return { products };
}

export async function getAllDeliveries() {
  await connectMongo();

  let deliveries = await Delivery.find({});
  deliveries = JSON.parse(JSON.stringify(deliveries));
  return { deliveries };
}
