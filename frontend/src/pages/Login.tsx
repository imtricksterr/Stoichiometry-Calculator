import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ name: email.split("@")[0], email });
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div
        className="container page"
        style={{ maxWidth: "400px", color: "var(--color-text)" }}
      >
        <h1 className="text-xs-center">Sign in</h1>
        <p className="text-xs-center">
          <Link to="/register">Don't have an account?</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <button className="btn btn-lg btn-primary" style={{ width: "100%" }}>
            Sign in
          </button>
          <p className="text-xs-center">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
