import "./index.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <header><Navbar /></header>
      <main><Outlet /></main>
      <footer><Footer /></footer>
    </>
  );
}
export default App;
