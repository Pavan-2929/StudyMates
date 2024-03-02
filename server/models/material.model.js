import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  materialURL: {
    type: String,
    required: true,
  }
});

const Material = mongoose.model("Material", materialSchema)

export default Material
