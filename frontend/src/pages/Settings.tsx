import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user, updateUser, deleteAccount } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  async function handleAccountSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await updateUser(name, email);
      setSuccess("Account updated!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // password update logic coming when backend supports it
    setSuccess("Password updated!");
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );
    if (confirmed) {
      await deleteAccount();
      navigate("/");
    }
  }

  return (
    <div
      className="container page"
      style={{ maxWidth: "600px", marginTop: "2rem" }}
    >
      <h2 style={{ color: "var(--color-text)", marginBottom: "0.25rem" }}>
        Settings
      </h2>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
        Manage your account and preferences.
      </p>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      {success && (
        <p style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>
          {success}
        </p>
      )}

      {/* Account */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div className="card-block">
          <h5 style={{ marginBottom: "1rem" }}>Account</h5>
          <form onSubmit={handleAccountSubmit}>
            <div className="form-group">
              <label>Display Name</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>

      {/* Password */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div className="card-block">
          <h5 style={{ marginBottom: "1rem" }}>Password</h5>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* Appearance */}
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
            <h5 style={{ marginBottom: "4px" }}>Appearance</h5>
            <p style={{ color: "var(--color-text-muted)", marginBottom: 0 }}>
              {isDark ? "Dark mode is on" : "Light mode is on"}
            </p>
          </div>
          <button className="btn btn-outline-primary" onClick={toggleTheme}>
            {isDark ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div
        className="card"
        style={{ marginBottom: "1rem", border: "1px solid #b85c5c" }}
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
            <h5 style={{ marginBottom: "4px", color: "#b85c5c" }}>
              Danger Zone
            </h5>
            <p style={{ color: "var(--color-text-muted)", marginBottom: 0 }}>
              Permanently delete your account and all data.
            </p>
          </div>
          <button
            className="btn btn-outline-danger"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
