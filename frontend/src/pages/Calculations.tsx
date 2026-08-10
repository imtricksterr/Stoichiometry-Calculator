import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import {
  saveCalculation,
  calculateMolarMass,
  calculateStoichiometry,
  calculateLimitingReagent,
  calculatePercentYield,
} from "../lib/api";

type Tab =
  | "molar-mass"
  | "stoichiometry"
  | "limiting-reagent"
  | "percent-yield";

function Calculations() {
  const [activeTab, setActiveTab] = useState<Tab>("molar-mass");

  return (
    <div className="container page" style={{ marginTop: "2rem" }}>
      {/* Tabs */}
      <ul
        className="nav nav-pills outline-active"
        style={{ marginBottom: "2rem" }}
      >
        {[
          { id: "molar-mass", label: "Molar Mass" },
          { id: "stoichiometry", label: "Stoichiometry" },
          { id: "limiting-reagent", label: "Limiting Reagent" },
          { id: "percent-yield", label: "% Yield" },
        ].map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id as Tab)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      {activeTab === "molar-mass" && <MolarMass />}
      {activeTab === "stoichiometry" && <Stoichiometry />}
      {activeTab === "limiting-reagent" && <LimitingReagent />}
      {activeTab === "percent-yield" && <PercentYield />}
    </div>
  );
}

function MolarMass() {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { user } = useAuth();

  async function calculate() {
    const response = await calculateMolarMass(formula);
    const answer = response.data.result;
    setResult(answer);

    if (user) {
      await saveCalculation("molar-mass", formula, `${answer} g/mol`);
    }
  }

  return (
    <div>
      <h3 style={{ color: "var(--color-text)" }}>Molar Mass</h3>
      <p style={{ color: "var(--color-text-muted)" }}>
        Enter a chemical formula to calculate its molar mass.
      </p>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          placeholder="e.g. H2O"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={calculate}>
        Calculate
      </button>
      {result && (
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <div className="card-block">
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
              }}
            >
              Molar Mass
            </p>
            <h2 style={{ color: "var(--color-primary)" }}>{result} g/mol</h2>
          </div>
        </div>
      )}
    </div>
  );
}

function Stoichiometry() {
  const [given, setGiven] = useState("");
  const [givenMoles, setGivenMoles] = useState("");
  const [givenReactants, setGivenReactants] = useState("");
  const [givenProducts, setGivenProducts] = useState("");
  const [target, setTarget] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { user } = useAuth();

  async function calculate() {
    const response = await calculateStoichiometry(
      given,
      parseFloat(givenMoles),
      target,
      givenReactants.split(",").map((s) => s.trim()),
      givenProducts.split(",").map((s) => s.trim()),
    );
    const answer = response.data.result;
    setResult(answer);

    if (user) {
      await saveCalculation(
        "stoichiometry",
        `${given} -> ${target}`,
        `${answer} mol`,
      );
    }
  }

  return (
    <div>
      <h3 style={{ color: "var(--color-text)" }}>Stoichiometry</h3>
      <p style={{ color: "var(--color-text-muted)" }}>
        Calculate moles of a product or reactant from a balanced equation.
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label style={{ color: "var(--color-text)" }}>Given Compound</label>
            <input
              className="form-control"
              placeholder="e.g. H2"
              value={given}
              onChange={(e) => setGiven(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label style={{ color: "var(--color-text)" }}>Moles of Given</label>
            <input
              className="form-control"
              placeholder="e.g. 3"
              value={givenMoles}
              onChange={(e) => setGivenMoles(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label style={{ color: "var(--color-text)" }}>
              Target Compound
            </label>
            <input
              className="form-control"
              placeholder="e.g. NH3"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label style={{ color: "var(--color-text)" }}>Reactants</label>
            <input
              className="form-control"
              placeholder="e.g. N2, H2"
              value={givenReactants}
              onChange={(e) => setGivenReactants(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label style={{ color: "var(--color-text)" }}>Products</label>
            <input
              className="form-control"
              placeholder="e.g. NH3"
              value={givenProducts}
              onChange={(e) => setGivenProducts(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={calculate}>
        Calculate
      </button>
      {result && (
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <div className="card-block">
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
              }}
            >
              Moles of Target
            </p>
            <h2 style={{ color: "var(--color-primary)" }}>{result} mol</h2>
          </div>
        </div>
      )}
    </div>
  );
}

function LimitingReagent() {
  const [reactants, setReactants] = useState(["", ""]);
  const [products, setProducts] = useState([""]);
  const [masses, setMasses] = useState(["", ""]);
  const [result, setResult] = useState<string | null>(null);
  const { user } = useAuth();
  console.log("reactants:", reactants);
  console.log("products:", products);
  console.log(
    "masses:",
    masses.map((m) => parseFloat(m)),
  );
  async function calculate() {
    const response = await calculateLimitingReagent(
      reactants,
      products,
      masses.map((m) => parseFloat(m)),
    );
    const limiting = response.data.result;
    setResult(limiting);

    if (user) {
      await saveCalculation(
        "limiting-reagent",
        `${reactants.join(" + ")} -> ${products.join(" + ")}`,
        `${limiting} is limiting`,
      );
    }
  }

  return (
    <div>
      <h3 style={{ color: "var(--color-text)" }}>Limiting Reagent</h3>
      <p style={{ color: "var(--color-text-muted)" }}>
        Enter masses of your reactants to identify the limiting reagent.
      </p>

      {/* Reactants */}
      {reactants.map((formula, i) => (
        <div className="card" style={{ marginBottom: "1rem" }} key={i}>
          <div className="card-block">
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "0.8rem",
                color: "var(--color-text-muted)",
              }}
            >
              Reactant {i + 1}
            </p>
            <div className="form-group">
              <label>Formula</label>
              <input
                className="form-control"
                placeholder="e.g. N2"
                value={formula}
                onChange={(e) => {
                  const updated = [...reactants];
                  updated[i] = e.target.value;
                  setReactants(updated);
                }}
              />
            </div>
            <div className="form-group">
              <label>Mass (g)</label>
              <input
                className="form-control"
                placeholder="e.g. 28.0"
                value={masses[i]}
                onChange={(e) => {
                  const updated = [...masses];
                  updated[i] = e.target.value;
                  setMasses(updated);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
        → PRODUCES
      </p>

      {/* Products */}
      {products.map((formula, i) => (
        <div className="card" style={{ marginBottom: "1rem" }} key={i}>
          <div className="card-block">
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "0.8rem",
                color: "var(--color-text-muted)",
              }}
            >
              Product {i + 1}
            </p>
            <div className="form-group">
              <label>Formula</label>
              <input
                className="form-control"
                placeholder="e.g. NH3"
                value={formula}
                onChange={(e) => {
                  const updated = [...products];
                  updated[i] = e.target.value;
                  setProducts(updated);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        className="btn btn-primary"
        style={{ width: "100%" }}
        onClick={calculate}
      >
        Find Limiting Reagent
      </button>

      {result && (
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <div className="card-block">
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
              }}
            >
              Limiting Reagent
            </p>
            <h2 style={{ color: "var(--color-primary)" }}>{result}</h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              consumed first — limits product formation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function PercentYield() {
  const [actual, setActual] = useState("");
  const [theoretical, setTheoretical] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { user } = useAuth();

  async function calculate() {
    const data = await calculatePercentYield(
      parseFloat(actual),
      parseFloat(theoretical),
    );
    setResult(data.data.result);

    if (user) {
      await saveCalculation(
        "percent-yield",
        `Actual: ${actual}g / Theoretical: ${theoretical}g`,
        `${data}%`,
      );
    }
  }

  return (
    <div>
      <h3 style={{ color: "var(--color-text)" }}>% Yield</h3>
      <p style={{ color: "var(--color-text-muted)" }}>
        Calculate the percent yield of a reaction.
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label style={{ color: "var(--color-text)" }}>
              Actual Yield (g)
            </label>
            <input
              className="form-control form-control-lg"
              placeholder="e.g. 3.5"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label style={{ color: "var(--color-text)" }}>
              Theoretical Yield (g)
            </label>
            <input
              className="form-control form-control-lg"
              placeholder="e.g. 4.0"
              value={theoretical}
              onChange={(e) => setTheoretical(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={calculate}>
        Calculate
      </button>
      {result !== null && (
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <div className="card-block">
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
              }}
            >
              Percent Yield
            </p>
            <h2 style={{ color: "var(--color-primary)" }}>{result}%</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculations;
