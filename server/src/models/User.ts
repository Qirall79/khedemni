import { Schema, model } from "mongoose";

const userModel: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  sector: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  birth: { type: Date, required: true },
  service: { type: String, required: true },
  availability: [String],
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  photo: { type: String },
  note: { type: String },
});

export default model("User", userModel);
