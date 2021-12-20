import * as mongoose from "mongoose";

const opportunitiesSchema = new mongoose.Schema({
  totalValue: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

const Opportunities = mongoose.model("Opportunities", opportunitiesSchema);
Opportunities.createIndexes({ createdAt: 1 });

export { Opportunities };
