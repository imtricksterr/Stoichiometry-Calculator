import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <h4 style={{ color: "var(--color-text)", marginBottom: "0.25rem" }}>
            {user.name}
          </h4>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
            {user.email}
          </p>
        </div>
      </div>

      <div className="container page" style={{ maxWidth: "600px" }}>
        {/* Account Details */}
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div className="card-block">
            <h5 style={{ marginBottom: "1rem" }}>Account Details</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "0.8rem",
                    marginBottom: "2px",
                  }}
                >
                  NAME
                </p>
                <p style={{ marginBottom: 0 }}>{user.name}</p>
              </div>
              <div>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "0.8rem",
                    marginBottom: "2px",
                  }}
                >
                  EMAIL
                </p>
                <p style={{ marginBottom: 0 }}>{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Calculations */}
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div className="card-block">
            <h5 style={{ marginBottom: "1rem" }}>Saved Calculations</h5>
            <p style={{ color: "var(--color-text-muted)" }}>
              No saved calculations yet. Open{" "}
              <Link to="/calculations">calculator</Link> to get started.
              <Link to="/history">history</Link> to get started.
            </p>
          </div>
        </div>

        {/* Saved Calculations */}
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div
            className="card-block"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h5 style={{ marginBottom: "4px" }}>Saved Calculations</h5>
              <p style={{ color: "var(--color-text-muted)", marginBottom: 0 }}>
                View your past calculations and results.
              </p>
            </div>
            <Link to="/history" className="btn btn-outline-primary">
              View History
            </Link>
          </div>
        </div>

        {/* Logout */}
        <button
          className="btn btn-outline-danger"
          style={{ width: "100%" }}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
