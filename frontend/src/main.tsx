import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <RouterProvider router={router} />,
  </AuthProvider>,
);
