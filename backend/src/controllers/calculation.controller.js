import Calculation from "../models/calculation.model.js";

export const getCalculation = async (req, res, next) => {
  try {
    const calculation = await Calculation.findById(req.params.id);

    if (!calculation) {
      const error = new Error("Calculation not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: calculation });
  } catch (error) {
    next(error);
  }
};

export const getCalculations = async (req, res, next) => {
  try {
    const calculations = await Calculation.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, data: calculations });
  } catch (error) {
    next(error);
  }
};

export const createCalculation = async (req, res, next) => {
  try {
    const { type, label, result } = req.body;

    const calculation = await Calculation.create({
      user: req.user._id,
      type,
      label,
      result,
    });

    res.status(201).json({ success: true, data: calculation });
  } catch (error) {
    next(error);
  }
};

export const deleteCalculation = async (req, res, next) => {
  try {
    await Calculation.findByIdAndDelete(req.params._id);

    res
      .status(200)
      .json({ success: true, message: "Deleted calculation successfully" });
  } catch (error) {
    next(error);
  }
};
