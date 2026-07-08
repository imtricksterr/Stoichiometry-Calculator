import { useState } from "react";
import { useAuth } from "../context/AuthContext";

type FilterType =
  | "all"
  | "molar-mass"
  | "stoichiometry"
  | "limiting-reagent"
  | "percent-yield";

interface HistoryEntry {
  id: number;
  type: FilterType;
  label: string;
  result: string;
  date: string;
}

// placeholder data - will be replaced with real backend data later
const mockHistory: HistoryEntry[] = [
  {
    id: 1,
    type: "molar-mass",
    label: "H2O",
    result: "18.015 g/mol",
    date: "July 6, 2026",
  },
  {
    id: 2,
    type: "stoichiometry",
    label: "N2 + 3H2 → 2NH3",
    result: "2.5 mol NH3",
    date: "July 6, 2026",
  },
  {
    id: 3,
    type: "limiting-reagent",
    label: "N2 + H2 → NH3",
    result: "H2 is limiting",
    date: "July 5, 2026",
  },
  {
    id: 4,
    type: "percent-yield",
    label: "Actual: 3.5g / Theoretical: 4.0g",
    result: "87.5%",
    date: "July 5, 2026",
  },
  {
    id: 5,
    type: "molar-mass",
    label: "C6H12O6",
    result: "180.156 g/mol",
    date: "July 4, 2026",
  },
];

const filterLabels: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "molar-mass", label: "Molar Mass" },
  { id: "stoichiometry", label: "Stoichiometry" },
  { id: "limiting-reagent", label: "Limiting Reagent" },
  { id: "percent-yield", label: "% Yield" },
];

const typeLabels: Record<string, string> = {
  "molar-mass": "Molar Mass",
  stoichiometry: "Stoichiometry",
  "limiting-reagent": "Limiting Reagent",
  "percent-yield": "% Yield",
};

function History() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const { user } = useAuth();

  const filtered =
    activeFilter === "all"
      ? mockHistory
      : mockHistory.filter((entry) => entry.type === activeFilter);

  if (!user) {
    return (
      <div
        className="container page"
        style={{ textAlign: "center", marginTop: "4rem" }}
      >
        <h2>Sign in to view your history</h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
          Your saved calculations will appear here once you're logged in.
        </p>
        <a href="/login" className="btn btn-primary">
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="container page" style={{ marginTop: "2rem" }}>
      <h2 style={{ color: "var(--color-text)", marginBottom: "0.5rem" }}>
        Calculation History
      </h2>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        Your saved calculations across all tools.
      </p>

      {/* Filter Tabs */}
      <ul
        className="nav nav-pills outline-active"
        style={{ marginBottom: "1.5rem" }}
      >
        {filterLabels.map((f) => (
          <li className="nav-item" key={f.id}>
            <button
              className={`nav-link ${activeFilter === f.id ? "active" : ""}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Results */}
      {filtered.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)" }}>
          No calculations found for this filter.
        </p>
      ) : (
        filtered.map((entry) => (
          <div
            className="card"
            key={entry.id}
            style={{ marginBottom: "0.75rem" }}
          >
            <div
              className="card-block"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {typeLabels[entry.type]}
                </p>
                <p
                  style={{
                    fontWeight: 500,
                    marginBottom: "4px",
                    color: "var(--color-text)",
                  }}
                >
                  {entry.label}
                </p>
                <p style={{ color: "var(--color-primary)", marginBottom: 0 }}>
                  {entry.result}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  {entry.date}
                </p>
                <button className="btn btn-sm btn-outline-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
