import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../lib/api";

type FilterType =
  | "all"
  | "molar-mass"
  | "stoichiometry"
  | "limiting-reagent"
  | "percent-yield";

interface HistoryEntry {
  _id: string;
  type: FilterType;
  label: string;
  result: string;
  createdAt: string;
}

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
  const [calculations, setCalculations] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function fetchCalculations() {
      try {
        const data = await apiRequest("/calculations");
        setCalculations(data.data);
      } catch (err) {
        console.error("Failed to fetch calculations:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCalculations();
  }, [user]);

  async function handleDelete(id: string) {
    try {
      await apiRequest(`/calculations/${id}`, { method: "DELETE" });
      setCalculations((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete calculation:", err);
    }
  }

  const filtered =
    activeFilter === "all"
      ? calculations
      : calculations.filter((entry) => entry.type === activeFilter);

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

  if (loading) {
    return (
      <div
        className="container page"
        style={{ textAlign: "center", marginTop: "4rem" }}
      >
        <p style={{ color: "var(--color-text-muted)" }}>Loading...</p>
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
            key={entry._id}
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
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(entry._id)}
                >
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
