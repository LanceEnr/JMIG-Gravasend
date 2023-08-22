import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
