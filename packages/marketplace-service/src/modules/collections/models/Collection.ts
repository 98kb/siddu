import {Schema, model} from "mongoose";

const CollectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  facts: [
    {
      title: String,
      content: {
        type: String,
        required: true,
      },
    },
  ],
  labels: [String],
});

export const Collection = model("Collection", CollectionSchema);
