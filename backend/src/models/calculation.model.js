import mongoose from "mongoose";

const calculationSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Category type required"],
    lowercase: true,
  },
});

const calculation = mongoose.model("Calculation", calculationSchema);

export default calculation;
