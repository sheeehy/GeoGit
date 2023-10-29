import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import navBar from "./components/navBar";

function App() {
  return (
    <Router>
      <navBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
