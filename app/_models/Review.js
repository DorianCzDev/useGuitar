import mongoose from "mongoose";
import "@/app/_models/Product";

const ReviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Please provide comment to review"],
      maxlength: [1000, "Review can not be more than 1000 characters"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    isReported: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

ReviewSchema.statics.calculateAvarageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: !result[0].averageRating.toString().split(".")[1]
          ? result[0]?.averageRating
          : result[0]?.averageRating.toFixed(2) || 0,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAvarageRating(this.product);
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
