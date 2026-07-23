import mongoose from "mongoose";

const calculationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "molar-mass",
        "stoichiometry",
        "limiting-reagent",
        "percent-yield",
      ],
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Calculation = mongoose.model("Calculation", calculationSchema);

export default Calculation;
