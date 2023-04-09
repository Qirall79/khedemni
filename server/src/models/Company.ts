import { Schema, model } from "mongoose";

const companyModel: Schema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  personFirstName: { type: String, required: true },
  personLastName: { type: String, required: true },
  personStatus: { type: String, required: true },
  city: { type: String, required: true },
  sector: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  activity: { type: String, required: true },
  note: { type: String },
});

export default model("Company", companyModel);
