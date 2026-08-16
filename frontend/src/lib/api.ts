const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 && localStorage.getItem("token")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return;
  }

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Error");
  return data;
}

export async function saveCalculation(
  type: string,
  label: string,
  result: string,
) {
  return apiRequest("/calculations", {
    method: "POST",
    body: JSON.stringify({ type, label, result }),
  });
}

// python api
export async function calculateMolarMass(formula: string) {
  return apiRequest("/calculations/molar-mass", {
    method: "POST",
    body: JSON.stringify({ formula }),
  });
}

export async function calculateStoichiometry(
  given: string,
  moles: number,
  target: string,
  reactants: string[],
  products: string[],
) {
  return apiRequest("/calculations/stoichiometry", {
    method: "POST",
    body: JSON.stringify({ given, moles, target, reactants, products }),
  });
}

export async function calculatePercentYield(
  actual: number,
  theoretical: number,
) {
  return apiRequest("/calculations/percent-yield", {
    method: "POST",
    body: JSON.stringify({ actual, theoretical }),
  });
}

export async function calculateLimitingReagent(
  reactants: string[],
  products: string[],
  masses: number[],
) {
  return apiRequest("/calculations/limiting-reagent", {
    method: "POST",
    body: JSON.stringify({ reactants, products, masses }),
  });
}
