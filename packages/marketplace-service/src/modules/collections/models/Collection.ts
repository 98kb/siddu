import {Schema, model} from "mongoose";

const LabelSchema = new Schema({
  name: String,
});

const FactSchema = new Schema({
  content: String,
  labels: [LabelSchema],
});

const CollectionSchema = new Schema({
  name: String,
  facts: [FactSchema],
});

export const Collection = model("Collection", CollectionSchema);
