import { Link } from "react-router-dom";
import SourceCodeLink from "./SourceCodeLink";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div>
          <Link to="/" className="navbar-logo-footer">
            Ratio
          </Link>
          <span className="attribution">
            A chemistry interactive learning project
          </span>
        </div>

        <SourceCodeLink />
      </div>
    </footer>
  );
}

export default Footer;
