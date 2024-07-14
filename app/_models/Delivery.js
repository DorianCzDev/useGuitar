import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({}, { strict: false });

export default mongoose.models.Delivery ||
  mongoose.model("Delivery", DeliverySchema);
