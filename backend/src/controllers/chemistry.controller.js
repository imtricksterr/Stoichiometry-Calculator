import { CHEMISTRY_API_URL } from "../config/env";

export const getMolarMass = async (req, res, next) => {
  const url = `{CHEMISTRY_API_URL}/molar-mass`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formula: req.body.formula }),
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(400).json({ success: false, message: data.detail });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getStoichiometry = async (req, res, next) => {
  const url = `{CHEMISTRY_API_URL}/stoichiometry`;

  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        given: req.body.given,
        moles: req.body.moles,
        target: req.body.target,
        reactants: req.body.reactants,
        products: req.body.products,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(400).json({ success: false, message: data.detail });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getPercentYield = async (req, res, next) => {
  const url = `{CHEMISTRY_API_URL}/percent-yield`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        actual: req.body.actual,
        theoretical: req.body.theoretical,
      }),
    });

    const data = await response.json();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getLimitingReagent = async (req, res, next) => {
  const url = `{CHEMISTRY_API_URL}/limiting-reagent`;

  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reactants: req.body.reactants,
        products: req.body.products,
        masses: req.body.masses,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(400).json({ success: false, message: data.detail });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
