import mongoose from "mongoose";

const opportunitiesSchema = new mongoose.Schema({
  totalValue: Number,
  date: Date,
});

const Opportunities = mongoose.model("Opportunities", opportunitiesSchema);

export { Opportunities };
