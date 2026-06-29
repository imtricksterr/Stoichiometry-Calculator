import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-logo logo-font" href="/">
          Ratio
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
