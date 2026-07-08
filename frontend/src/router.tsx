import { createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import History from "./pages/History.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Calculations from "./pages/Calculations.tsx";
import Settings from "./pages/Settings.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "history", element: <History /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "calculations", element: <Calculations /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
