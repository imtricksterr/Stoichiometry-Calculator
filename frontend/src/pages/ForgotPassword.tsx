import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // password reset here eventually
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <div className="container page" style={{ maxWidth: "400px" }}>
        <h1 className="text-xs-center">Forgot Password</h1>
        <p className="text-xs-center" style={{ color: "#6b7280" }}>
          Enter your account email for your reset link.
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
          <button className="btn btn-lg btn-primary" style={{ width: "100%" }}>
            Send Reset Link
          </button>
        </form>

        <p className="text-xs-center" style={{ marginTop: "1rem" }}>
          <Link to="/login">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
