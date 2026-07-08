import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import MoonIcon from "../assets/icons/moon.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import GearIcon from "../assets/icons/gear.svg?react";

function Navbar() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
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
          {user ? (
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
          ) : (
            <>
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
            </>
          )}
          <li className="nav-item">
            <button onClick={toggleTheme} className="btn btn-sm">
              {isDark ? (
                <SunIcon
                  style={{
                    fill: "var(--color-text)",
                    width: "20px",
                    height: "20px",
                  }}
                />
              ) : (
                <MoonIcon
                  style={{
                    fill: "var(--color-text)",
                    width: "20px",
                    height: "20px",
                  }}
                />
              )}
            </button>
          </li>
          <li className="nav-item">
            <NavLink to="/settings" className="btn btn-sm">
              <GearIcon
                style={{
                  fill: "var(--color-text)",
                  width: "20px",
                  height: "20px",
                }}
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
