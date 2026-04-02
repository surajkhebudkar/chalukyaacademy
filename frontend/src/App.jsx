import { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loader from "./components/Loader/Loader";
import "./App.css";
import "./index.css";
import ScrollTop from "./components/scrolltop/ScrollTop";
import Home from "./pages/Home";
import News from "./pages/News";
import Events from "./pages/Events";
import Sports from "./pages/Sports";
import PhotoGallery from "./pages/PhotoGallery";
import AboutUs from "./pages/AboutUs";



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simple loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <div className="app-container">
            <Navbar />

            {/* Main Content */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/events" element={<Events />} />
                <Route path="/sports" element={<Sports />} />
                  <Route path="/gallery" element={<PhotoGallery />} />
                  <Route path="/about" element={<AboutUs />} />
              </Routes>
            </main>

            <Footer />
            <ScrollTop />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;