import mongoose from "mongoose";
import "@/app/_models/Review";

const ProductSchema = new mongoose.Schema(
  {},
  { strict: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
