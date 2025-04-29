import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
  {
    size: String,
    price: Number,
  },
  { _id: false }
);

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    extras: [String],
    variants: [VariantSchema],
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", MenuItemSchema);
