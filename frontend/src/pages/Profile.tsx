import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
          <h4>{user.name}</h4>
          <p>{user.email}</p>
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
              <a href="/calculations">calculator</a> to get started.
            </p>
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
