import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Sevices/Services";
import Portfolio from "./pages/Portfolio/Portfolio";
import Footer from "./components/Footer/Footer";
import Project from "./pages/Project/Project";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<Project />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;