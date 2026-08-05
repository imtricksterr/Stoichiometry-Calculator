import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { saveCalculation } from "../lib/api";

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
    const calculated = 18.015; // placeholder
    setResult(18.015);

    if (user) {
      await saveCalculation("molar-mass", formula, `${calculated} g/mol`);
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
    const calculated = 2.5; // placeholder
    setResult(calculated);

    if (user) {
      await saveCalculation(
        "stoichiometry",
        `${given} -> ${target}`,
        `${calculated}`,
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
      </div>
      <div className="form-group">
        <label style={{ color: "var(--color-text)" }}>Target Compound</label>
        <input
          className="form-control"
          placeholder="e.g. NH3"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label style={{ color: "var(--color-text)" }}>Reactants</label>
          <input
            className="form-control"
            placeholder="e.g. N2H2"
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
  // reactants: list[str], products: list[str], masses: list[float]
  const [reactant1, setReactant1] = useState({
    formula: "",
    coeff: "",
    mass: "",
  });
  const [reactant2, setReactant2] = useState({
    formula: "",
    coeff: "",
    mass: "",
  });
  const [product, setProduct] = useState({ formula: "", coeff: "" });
  const [result, setResult] = useState<string | null>(null);

  const { user } = useAuth();

  async function calculate() {
    const limiting = reactant1.formula || "H2"; // placeholder
    setResult(limiting);

    if (user) {
      await saveCalculation(
        "limiting-reagent",
        `${reactant1.formula} + ${reactant2.formula} -> ${product.formula}`,
        `${limiting} is limiting`,
      );
    }
  }

  return (
    <div>
      <h3 style={{ color: "var(--color-text)" }}>Limiting Reagent</h3>
      <p style={{ color: "var(--color-text-muted)" }}>
        Enter masses of two reactants to identify the limiting reagent.
      </p>

      {/* Reactant 1 */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div className="card-block">
          <p
            style={{
              textTransform: "uppercase",
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
            }}
          >
            Reactant 1
          </p>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <p>Coeff.</p>
                <input
                  className="form-control"
                  placeholder="1"
                  value={reactant1.coeff}
                  onChange={(e) =>
                    setReactant1({ ...reactant1, coeff: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-9">
              <div className="form-group">
                <p>Formula</p>
                <input
                  className="form-control"
                  placeholder="e.g. N2"
                  value={reactant1.formula}
                  onChange={(e) =>
                    setReactant1({ ...reactant1, formula: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <p>Mass (g)</p>
            <input
              className="form-control"
              placeholder="e.g. 28.0"
              value={reactant1.mass}
              onChange={(e) =>
                setReactant1({ ...reactant1, mass: e.target.value })
              }
            />
          </div>
        </div>
      </div>
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
    const pct =
      Math.round((parseFloat(actual) / parseFloat(theoretical)) * 100 * 100) /
      100;
    setResult(Math.round(pct));

    if (user) {
      await saveCalculation(
        "percent-yield",
        `Actual: ${actual}g / Theoretical: ${theoretical}g`,
        `${pct}%`,
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
