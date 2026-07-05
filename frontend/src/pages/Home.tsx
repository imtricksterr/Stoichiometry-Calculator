import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      {}
      <div className="banner">
        <div className="container">
          <h1 className="title">Ratio</h1>
          <p className="subheader">
            Balance equations. Calculate molarity. Internalize chemistry.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <Link to="/calculations" className="btn btn-lg btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {}
      <div className="container" style={{ marginTop: "3rem" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "var(--color-text)",
          }}
        >
          General Functions
        </h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <h4> Balance Equations</h4>
                <p className="card-text">
                  Automatically balance chemical equations.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <h4> Mole Calculations</h4>
                <p className="card-text">
                  Convert between grams, moles, and molecules instantly.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <h4> Save Your Work</h4>
                <p className="card-text">
                  Sign in to keep a history of all your calculations and
                  practice problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div
        className="container"
        style={{ marginTop: "3rem", color: "var(--color-text)" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          How it works
        </h2>
        <div className="row">
          <div className="col-md-4" style={{ textAlign: "center" }}>
            <h2 style={{ color: "#0d9488" }}>1</h2>
            <h5>Enter your equation</h5>
            <p>Type in your chemical equation or reaction.</p>
          </div>
          <div className="col-md-4" style={{ textAlign: "center" }}>
            <h2 style={{ color: "#0d9488" }}>2</h2>
            <h5>Input your values</h5>
            <p>Provide your known quantities like grams or moles.</p>
          </div>
          <div className="col-md-4" style={{ textAlign: "center" }}>
            <h2 style={{ color: "#0d9488" }}>3</h2>
            <h5>Get your results</h5>
            <p>Ratio instantly calculates everything you need.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          textAlign: "center",
          margin: "4rem 0",
          color: "var(--color-text)",
        }}
      >
        <h2>Ready to start?</h2>
        <p
          style={{
            marginBottom: "1.5rem",
            color: "var(--color-text)",
          }}
        >
          Jump into the calculator and get studying.
        </p>
        <Link to="/calculations" className="btn btn-lg btn-primary">
          Open Calculator
        </Link>
      </div>
    </div>
  );
}

export default Home;
